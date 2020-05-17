using Automatizuota_parduotuve.Models;
using Automatizuota_parduotuve.Services.Interfaces;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Services
{
    public class ItemSetService : IItemSetService
    {
        private readonly Context.StoreContext _context;

        public ItemSetService(Context.StoreContext context)
        {
            _context = context;
        }
        public async Task<ItemSet> CreateItemSet(ItemSet itemSet)
        {
            _context.ItemSets.Add(itemSet);
            await _context.SaveChangesAsync();
            return itemSet;
        }
    }
}
