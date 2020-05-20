using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Automatizuota_parduotuve.Context;
using Automatizuota_parduotuve.Models;
using Services.Interfaces;
using Automatizuota_parduotuve.Enums;

namespace Automatizuota_parduotuve.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _orderService.GetOrders();
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetUserOrders(string id)
        {
            return await _orderService.GetUserOrders(id);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _orderService.GetOrder(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder([FromBody]OrderDTO order)
        {
            var id = await _orderService.CreateOrder(order);
            return Ok(id);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Item>> DeleteItem(int id)
        {
            var item = await _orderService.DeleteOrder(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Order>> updateOrderState([FromRoute]int id, [FromBody]int newState)
        {
            if (newState < 0 || newState > 4) return BadRequest();
            var order = await _orderService.UpdateOrder(id, newState);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }
        [HttpPut("pickup/{id}")]
        public async Task<ActionResult<Order>> pickupOrder(int id)
        {
            var order = await _orderService.PickUpOrder(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }


        [HttpPut("collect/{id}")]
        public async Task<ActionResult<Order>> collectOrder(int id)
        {
            var order = await _orderService.UpdateOrder(id, 1);
            if (order == null)
            {
                return NotFound();
            }
            order = await _orderService.CollectOrder(id);
            if (order == null)
            {
                return NotFound();
            }
            //order = await _orderService.UpdateOrder(id, 3);
            //if (order == null)
           // {
             //   return NotFound();
            //}

            return Ok(order);
        }
    }
}
