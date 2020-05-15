using Automatizuota_parduotuve.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IOrderService
    {
        public Task<List<Order>> GetOrders();
        public Task<List<Order>> GetUserOrders(int id);
        public Task<Order> GetOrder(int id);
        public Task<int> CreateOrder(OrderDTO order);
    }
}
