using Automatizuota_parduotuve.Models;
using Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Services
{
    public class ItemService : IItemService
    {
        private readonly Context.StoreContext _context;

        public ItemService(Context.StoreContext context)
        {
            _context = context;
        }
        public async Task<List<Item>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }
        public async Task<Item> GetItem(int id)
        {
            return await _context.Items.FindAsync(id);
        }
        public async Task<int> Post(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();
            return item.Id;
        }
        public async Task<Item> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return null;
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return item;
        }
        public async Task<bool> ValidateItems(IList<ItemDTO> items)
        {
            foreach (var itemDTO in items)
            {
                var item = await this.GetItem(itemDTO.Id);
                if (itemDTO.Count > item.Amount)
                    return false;
            }
            return true;
        }
    }
}
