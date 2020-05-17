using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Models
{
    public class ItemDTO
    {
        public int Count { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
    }
}
