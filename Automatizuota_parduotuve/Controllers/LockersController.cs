using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Automatizuota_parduotuve.Context;
using Automatizuota_parduotuve.Models;
using Automatizuota_parduotuve.Services.Interfaces;

namespace Automatizuota_parduotuve.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LockersController : ControllerBase
    {
        private readonly ILockerService _LockerService;

        public LockersController(ILockerService lockerService)
        {
            _LockerService = lockerService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Locker>>> GetLockers()
        {
            return await _LockerService.GetLockers();
        }

        [HttpPost]
        public async Task<ActionResult<Locker>> PostLocker(Locker locker)
        {
            var id = await _LockerService.CreateLocker(locker);

            return Ok(id);
        }
    }
}
