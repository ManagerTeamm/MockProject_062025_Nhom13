using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Repositories
{
    public class UserCaseRepository : Repository<UserCase>, IUserCaseRepository
    {
        public UserCaseRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task DeleteAllByCaseIdAsync(string caseId)
        {
            var list = await _dbSet.Where(x => x.CaseId == caseId).ToListAsync();
            if (list.Any())
                _dbSet.RemoveRange(list);
        }
    }
}
