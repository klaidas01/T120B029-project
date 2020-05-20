using Automatizuota_parduotuve.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Models
{
    public class Robot
    {
        public int Id { get; set; }

        public DateTime DataOfCreation { get; set; }

        public RobotState State { get; set; }

        public string Model { get; set; }

        public int NumberOfCarts { get; set; }

        public int SizeOfCart { get; set; }

    }
}
