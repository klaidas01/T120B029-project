﻿using Automatizuota_parduotuve.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Services.Interfaces
{
    public interface IMessageService
    {
        public Task<int> CreateMessage(Message message);
    }
}
