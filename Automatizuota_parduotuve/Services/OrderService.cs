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
        private readonly IRobotService _robotService;
        private readonly IMessageService _MessageService;


        public OrderService(StoreContext context, IItemService itemService, ILockerService lockerService,
            IItemSetService itemSetService, IRobotService robotService,IMessageService messageService)
        {
            _context = context;
            _itemService = itemService;
            _lockerService = lockerService;
            _itemSetService = itemSetService;
            _robotService = robotService;
            _MessageService = messageService;
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
            order.retrievalDate = DateTime.Now;
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
            var x = await _robotService.CollectOrder(order);
            if (x == false)
            {
                var message = new Message();
                message.Text = "Robotas nerastas";
                message.IsDelivered = false;
                await _MessageService.CreateMessage(message);
            }
            return order;
        }

        
    }
}
