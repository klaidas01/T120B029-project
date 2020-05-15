using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Enums
{
    public enum OrderState
    {
        ordered = 0,
        inProgress = 1,
        retrieved = 2,
        ready = 3,
        cancelled = 4,
    }
}
