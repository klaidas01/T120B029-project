using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public int Amount { get; set; }

        public string Size { get; set; }

        public double Weight { get; set; }

        public double Price { get; set; }
    }
}
