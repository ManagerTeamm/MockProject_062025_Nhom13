using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Repositories
{
    public class SceneProtectionRepository : Repository<SceneProtection>, ISceneProtectionRepository
    {
        public SceneProtectionRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<List<SceneProtection>> GetSceneProtectionsByCaseIdAsync(string caseId)
        {
            return await _dbSet
                .Where(sp => sp.CaseId == caseId && !sp.IsDeleted).ToListAsync();
        }
    }
}
