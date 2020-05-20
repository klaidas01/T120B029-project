using Automatizuota_parduotuve.Models;
using Automatizuota_parduotuve.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Services
{
    public class JournalService : IJournalService
    {
        private readonly Context.StoreContext _context;

        public JournalService(Context.StoreContext context)
        {
            _context = context;
        }

        public async Task<List<Journal>> GetJournal()
        {
            return await _context.Journals.ToListAsync();
        }
       
        public async Task<int> CreateJournal(Journal journal)
        {
            _context.Journals.Add(journal);
            await _context.SaveChangesAsync();
            return journal.Id;
        }
        public async Task<Journal> DeleteJournal(int id)
        {
            var journal = await _context.Journals.FindAsync(id);
            if (journal == null)
            {
                return null;
            }

            _context.Journals.Remove(journal);
            await _context.SaveChangesAsync();

            return journal;
        }
    }
}
