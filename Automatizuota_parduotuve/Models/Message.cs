using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Models
{
    public class Message
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public bool IsDelivered { get; set; }
    }
}
