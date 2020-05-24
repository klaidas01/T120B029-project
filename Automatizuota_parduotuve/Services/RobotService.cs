using Automatizuota_parduotuve.Enums;
using Automatizuota_parduotuve.Models;
using Automatizuota_parduotuve.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Services
{
    public class RobotService : IRobotService
    {
        private readonly IMessageService _MessageService;
        private readonly Context.StoreContext _context;

        public RobotService(Context.StoreContext context, IMessageService messageService)
        {
            _context = context;
            _MessageService = messageService;
        }

        public async Task<List<Robot>> GetRobot()
        {
            return await _context.Robots.ToListAsync();
        }
        public async Task<Robot> UpdateRobot(int id, int state)
        {
            var robot = await _context.Robots.FindAsync(id);
            if (robot == null)
            {
                return null;
            }
            robot.State = (RobotState)state;
            await _context.SaveChangesAsync();

            return robot;
        }
        public async Task<int> CreateRobot(Robot robot)
        {
            _context.Robots.Add(robot);
            await _context.SaveChangesAsync();
            return robot.Id;
        }
        public async Task<Robot> DeleteRobot(int id)
        {
            var robot = await _context.Robots.FindAsync(id);
            if (robot == null)
            {
                return null;
            }

            _context.Robots.Remove(robot);
            await _context.SaveChangesAsync();

            return robot;
        }

        static IEnumerable<IEnumerable<T>> GetPermutations<T>(IEnumerable<T> list, int length)
        {
            if (length == 1) return list.Select(t => new T[] { t });
            return GetPermutations(list, length - 1)
                .SelectMany(t => list.Where(o => !t.Contains(o)),
                    (t1, t2) => t1.Concat(new T[] { t2 }));
        }


        public async Task<Robot> chooseMachines()
        {
            return await _context.Robots.FirstOrDefaultAsync(x => x.State == (RobotState)0);
        }

        public List<Item> findOptimalPath(Order order)
        {
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
                for (int i = 0; i < x.Count() - 1; i++)
                {
                    var item1 = order.ItemSets.ToList().Find(id => id.ItemId == listOfX[i]);
                    var item2 = order.ItemSets.ToList().Find(id => id.ItemId == listOfX[i + 1]);
                    if (item2 != null && null != item1)
                    {
                        currScore += Math.Abs(item1.Item.CordinateX - item2.Item.CordinateX) + Math.Abs(item1.Item.CordinateY - item2.Item.CordinateY);
                    }
                    else if (item1 == null && item2 != null)
                    {
                        currScore += Math.Abs(item2.Item.CordinateX) + Math.Abs(item2.Item.CordinateY);
                    }
                    else if (item2 == null && item1 != null)
                    {
                        currScore += Math.Abs(item1.Item.CordinateX) + Math.Abs(item1.Item.CordinateY);
                    }

                    if (currScore > bestPathScore) break;
                }
                if (currScore < bestPathScore)
                {
                    bestPathScore = currScore;
                    bestPath.Clear();
                    bestPath.AddRange(x);
                }
            });
            return missingItems;
        }
        public async Task<bool> CollectOrder(Order order)
        {
            var robot = await chooseMachines();
            //var robot = await _context.Robots.FirstOrDefaultAsync(x => x.State == (RobotState)0);
            if (robot == null) return false;
            await UpdateRobot(robot.Id, 4);
           
            var missingItems = findOptimalPath(order);
            if (missingItems.Count > 0)
            {
                string MissingItemsId = "";
                foreach(var missingItem in missingItems)
                {
                    MissingItemsId += missingItem.Id.ToString();
                    MissingItemsId += "_";
                }
                var message = new Message();
                message.Text = "Prekės trūkumas - " + MissingItemsId;
                message.IsDelivered = false;
                await _MessageService.CreateMessage(message);
                message.Text = "Nesekmingas užsakymas" + order.Id;
                await _MessageService.CreateMessage(message);

            }
            else
            {
                var message = new Message();
                message.Text = "Sekmingas užsakymas" + order.Id;
                message.IsDelivered=false;
                await _MessageService.CreateMessage(message);
                await UpdateRobot(robot.Id, 0);
            }
            return true;
        }
    }
}
