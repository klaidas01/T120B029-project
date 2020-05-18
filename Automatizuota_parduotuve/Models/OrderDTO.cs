using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Models
{
    public class OrderDTO
    {
        public string UserId { get; set; }
        public IList<ItemDTO> Items { get; set; }
    }
}
