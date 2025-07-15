using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Repositories
{
    public class InitialResponseRepository : Repository<InitialResponse>, IInitialResponseRepository
    {
        public InitialResponseRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<InitialResponse> GetByCaseIdAsync(string caseId)
        {
            return await _dbSet.Where(x => x.CaseId == caseId).FirstOrDefaultAsync();
        }
    }
}
