using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Automatizuota_parduotuve.Context;
using Automatizuota_parduotuve.Enums;
using Automatizuota_parduotuve.Models;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;

namespace Automatizuota_parduotuve.Services.Interfaces
{
    public class OrderService : IOrderService
    {
        private readonly StoreContext _context;
        private readonly IItemService _itemService;
        private readonly ILockerService _lockerService;
        private readonly IItemSetService _itemSetService;

        public OrderService(StoreContext context, IItemService itemService, ILockerService lockerService, IItemSetService itemSetService)
        {
            _context = context;
            _itemService = itemService;
            _lockerService = lockerService;
            _itemSetService = itemSetService;
        }
        public async Task<List<Order>> GetOrders()
        {
            return await _context.Orders
                .Include(o => o.ItemSets)
                .ThenInclude(its => its.Item)
                .Include(o => o.Locker)
                .ToListAsync();
        }
        public async Task<List<Order>> GetUserOrders(string id)
        {
            return await _context.Orders
                .Where(o => o.UserId == id)
                .Include(o => o.ItemSets)
                .ThenInclude(its => its.Item)
                .Include(o => o.Locker)
                .ToListAsync();
        }
        public async Task<Order> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.ItemSets)
                .ThenInclude(its => its.Item)
                .Include(o => o.Locker)
                .Where(o => o.Id == id)
                .FirstOrDefaultAsync();

            return order;
        }
        public async Task<int> CreateOrder(OrderDTO order)
        {
            var isValid = await _itemService.ValidateItems(order.Items);
            if (!isValid) return -1;
            var locker = await _lockerService.AssignLocker();
            if (locker == null)
                return -2;
            locker.isFull = true;
            await _context.SaveChangesAsync();
            var o = new Order();
            o.LockerId = locker.Id;
            o.UserId = order.UserId;
            _context.Orders.Add(o);
            await _context.SaveChangesAsync();
            foreach (var item in order.Items)
            {
                var itemSet = new ItemSet { OrderId = o.Id, ItemId = item.Id, Count = item.Count };
                await _itemSetService.CreateItemSet(itemSet);
                var orderedItem = await _itemService.GetItem(item.Id);
                orderedItem.Amount = orderedItem.Amount - item.Count;
                await _context.SaveChangesAsync();
            }
            return o.Id;
        }
        public async Task<Order> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return null;
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }
        public async Task<Order> UpdateOrder(int id, int state)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return null;
            }
            order.state = (OrderState)state;
            await _context.SaveChangesAsync();

            return order;
        }
        public async Task<Order> PickUpOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            var locker = await _context.Lockers.FindAsync(order.LockerId);
            if (order == null || locker == null)
            {
                return null;
            }
            order.state = OrderState.retrieved;
            await _context.SaveChangesAsync();
            locker.isFull = false;
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<Order> CollectOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.ItemSets)
                .ThenInclude(its => its.Item)
                .Include(o => o.Locker)
                .Where(o => o.Id == id)
                .FirstOrDefaultAsync();
            if (order == null) 
            {
                return null;
            }
            // choose machine
            List<Item> missingItems = new List<Item>();
            List<int> bestPath = new List<int>();
            int bestPathScore = int.MaxValue;
            List<int> currentPath = new List<int>();
            foreach (ItemSet itemSet in order.ItemSets)
            {
                bestPath.Add(itemSet.ItemId);
            }
            var possibleRoutes = GetPermutations<int>(bestPath, bestPath.Count);
            possibleRoutes.ToList().ForEach(x =>
            {
                var listOfX = new List<int>();
                listOfX.Add(0);
                listOfX.AddRange(x);
                listOfX.Add(-1);
                int currScore = 0;
                for(int i = 0; i < x.Count()-1; i++)
                {
                    var item1 = order.ItemSets.ToList().Find(id => id.ItemId == listOfX[i]);
                    var item2 = order.ItemSets.ToList().Find(id => id.ItemId == listOfX[i+1]);
                    if (item2 != null && null != item1)
                    {
                        currScore += Math.Abs(item1.Item.CordinateX - item2.Item.CordinateX) + Math.Abs(item1.Item.CordinateY - item2.Item.CordinateY);
                    } else if(item1 == null && item2 != null)
                    {
                        currScore += Math.Abs(item2.Item.CordinateX) + Math.Abs(item2.Item.CordinateY);
                    } else if(item2 == null && item1 != null)
                    {
                        currScore += Math.Abs(item1.Item.CordinateX) + Math.Abs(item1.Item.CordinateY);
                    }  
                    
                    if (currScore > bestPathScore) break;
                }
                if(currScore < bestPathScore)
                {
                    bestPathScore = currScore;
                    bestPath.Clear();
                    bestPath.AddRange(x);
                }
            });
            // robot.collectOrder()
           //  Thread.Sleep(bestPathScore * 1000);
           if(missingItems.Count > 0)
            {
                //pranesti apie trukstamas prekes
                //inform admin par
                // pranest apie nesurinkta uzsayma

            } else
            {
                //paejo
                //paskirt spintele NEBE
                order = await UpdateOrder(id, 3);
                //pranest telefonu paralel
                //update robot
            }

            return order;
        }

        static IEnumerable<IEnumerable<T>> GetPermutations<T>(IEnumerable<T> list, int length)
        {
            if (length == 1) return list.Select(t => new T[] { t });
            return GetPermutations(list, length - 1)
                .SelectMany(t => list.Where(o => !t.Contains(o)),
                    (t1, t2) => t1.Concat(new T[] { t2 }));
        }
    }
}
