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
        private readonly Context.StoreContext _context;

        public RobotService(Context.StoreContext context)
        {
            _context = context;
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
    }
}
