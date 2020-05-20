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
    public class JournalController : ControllerBase
    {
        private readonly IJournalService _JournalService;

        public JournalController(IJournalService journalService)
        {
            _JournalService = journalService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Journal>>> GetJournals()
        {
            return await _JournalService.GetJournal();
        }

        [HttpPost]
        public async Task<ActionResult<Journal>> PostJournals(Journal journal)
        {
            var id = await _JournalService.CreateJournal(journal);
            return Ok(id);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Journal>> DeleteJournal(int id)
        {
            var journal = await _JournalService.DeleteJournal(id);
            if (journal == null)
            {
                return NotFound();
            }

            return Ok(journal);
        }
    }
}

