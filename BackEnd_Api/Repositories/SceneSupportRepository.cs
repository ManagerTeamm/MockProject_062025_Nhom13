using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Repositories
{
    public class SceneSupportRepository : Repository<SceneSuport>, ISceneSupportRepository
    {
        public SceneSupportRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task<List<SceneSuport>> GetSceneSupportsByCaseIdAsync(string caseId)
        {
            return await _dbSet
                .Where(ss => ss.CaseId == caseId && !ss.IsDeleted).ToListAsync();
        }
    }
}
