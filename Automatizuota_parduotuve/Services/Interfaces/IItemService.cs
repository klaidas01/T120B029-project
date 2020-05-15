using Automatizuota_parduotuve.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IItemService
    {
        public Task<List<Item>> GetItems();
        public Task<Item> GetItem(int id);
        public Task<int> Post(Item item);
        public Task<Item> DeleteItem(int id);
        public Task<bool> ValidateItems(IList<ItemDTO> items);
    }
}
