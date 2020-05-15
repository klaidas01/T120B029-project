using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Models
{
    public class Locker
    {
        public int Id { get; set; }

        public double Size { get; set; }

        public bool isFull { get; set; }

        public IList<Order> Orders { get; set; }
    }
}
