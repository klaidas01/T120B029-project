using Automatizuota_parduotuve.Models;
using Automatizuota_parduotuve.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Services
{

  
    public class MessageService : IMessageService
    {
        private readonly IJournalService _journalService;
        private readonly Context.StoreContext _context;

        public MessageService(Context.StoreContext context, IJournalService journalService)
        {
            _context = context;
            _journalService = journalService;
        }

        public async Task<int> CreateMessage(Message message)
        {
            if (message.IsDelivered)
            {
                //Pranesimas issiustas sekmingai
                return 0;
            }
            else
            {
                //pranesimas neisiustas, idedame zinute i zurnala
                var journal = new Journal();
                journal.Message = message.Text;
                journal.Sender = "Automatizuota";
                _journalService.CreateJournal(journal);
                return journal.Id;
            }
           
        }
       
    }
}
