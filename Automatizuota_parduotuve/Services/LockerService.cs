using Automatizuota_parduotuve.Models;
using Automatizuota_parduotuve.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Services
{
    public class LockerService : ILockerService
    {
        private readonly Context.StoreContext _context;

        public LockerService(Context.StoreContext context)
        {
            _context = context;
        }
        public async Task<List<Locker>> GetLockers()
        {
            return await _context.Lockers.ToListAsync();
        }
        public async Task<Locker> AssignLocker()
        {
            return await _context.Lockers.Where(l => l.isFull != true).FirstOrDefaultAsync();
        }
        public async Task<int> CreateLocker(Locker locker)
        {
            _context.Lockers.Add(locker);
            await _context.SaveChangesAsync();
            return locker.Id;
        }
    }
}
