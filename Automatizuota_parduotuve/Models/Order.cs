using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Automatizuota_parduotuve.Enums;
using System.Runtime.InteropServices;

namespace Automatizuota_parduotuve.Models
{
    public class Order
    {
        public int Id { get; set; }

        public OrderState state { get; set; }

        public DateTime orderDate { get; set; }

        public DateTime retrievalDate { get; set; }

        public DateTime predictedCompletionTime { get; set; }

        public IList<ItemSet> ItemSets { get; set; }

        public int LockerId { get; set; }
        public Locker Locker { get; set; }

        public int UserId { get; set; }

        public Order()
        {
            state = OrderState.ordered;
            orderDate = DateTime.Now;
            predictedCompletionTime = DateTime.Now.AddHours(3);
        }
    }
}
