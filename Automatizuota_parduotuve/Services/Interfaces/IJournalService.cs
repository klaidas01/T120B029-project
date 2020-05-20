using Automatizuota_parduotuve.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Services.Interfaces
{
    public interface IJournalService
    {
        public Task<List<Journal>> GetJournal();
        public Task<int> CreateJournal(Journal journal);
        public Task<Journal> DeleteJournal(int id);
    }
}
