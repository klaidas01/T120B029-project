using Automatizuota_parduotuve.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Services.Interfaces
{
    public interface IRobotService
    {

        public Task<List<Robot>> GetRobot();
        public Task<Robot> UpdateRobot(int id, int state);
        public Task<int> CreateRobot(Robot locker);
        public Task<Robot> DeleteRobot(int id);
        public Task<bool> CollectOrder(Order order);
    }
}
