using Automatizuota_parduotuve.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace Automatizuota_parduotuve.Models
{
    public class Journal
    {
        public int Id { get; set; }

        public string Message { get; set; }

        public string Sender { get; set; }

        public Journal() { }
    }
}
