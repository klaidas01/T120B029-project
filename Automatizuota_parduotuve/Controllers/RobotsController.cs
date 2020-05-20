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
    public class RobotsController : ControllerBase
    {
        private readonly IRobotService _RobotService;

        public RobotsController(IRobotService robotService)
        {
            _RobotService = robotService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Robot>>> GetRobots()
        {
            return await _RobotService.GetRobot();
        }

        [HttpPost]
        public async Task<ActionResult<Robot>> PostRobot(Robot robot)
        {
            var id = await _RobotService.CreateRobot(robot);
            return Ok(id);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Robot>> UpdateState([FromRoute]int id,[FromBody]int state)
        {
            if (state < 0 || state > 4) return BadRequest();
            var robot = await _RobotService.UpdateRobot(id, state);
            if (robot == null)
            {
                return NotFound();

            }
            return Ok(robot);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Robot>> DeleteRobot(int id)
        {
            var robot = await _RobotService.DeleteRobot(id);
            if (robot == null)
            {
                return NotFound();
            }

            return Ok(robot);
        }
    }
}
