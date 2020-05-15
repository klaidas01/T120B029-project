using Automatizuota_parduotuve.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Services.Interfaces
{
    public interface ILockerService
    {
        public Task<List<Locker>> GetLockers();
        public Task<Locker> AssignLocker();
        public Task<int> CreateLocker(Locker locker);
    }
}
