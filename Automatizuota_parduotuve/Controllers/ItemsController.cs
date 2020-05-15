using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Automatizuota_parduotuve.Context;
using Automatizuota_parduotuve.Models;
using backend.Services.Interfaces;

namespace Automatizuota_parduotuve.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemService _ItemService;

        public ItemsController(IItemService ItemService)
        {
            _ItemService = ItemService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            return await _ItemService.GetItems();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _ItemService.GetItem(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // POST: api/Items
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
            var id = await _ItemService.Post(item);

            return Ok(id);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Item>> DeleteItem(int id)
        {
            var item = await _ItemService.DeleteItem(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }
    }
}
