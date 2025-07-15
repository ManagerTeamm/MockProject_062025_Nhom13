using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Repositories
{
    public class ScenePreservationMeasureRepository : Repository<ScenePreservationMeasure>, IScenePreservationMeasureRepository
    {
        public ScenePreservationMeasureRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task DeleteAllByInitialResponseIdAsync(string initialResponseId)
        {
            var list = await _dbSet.Where(x => x.InitialResponseId == initialResponseId).ToListAsync();
            if (list.Any())
                _dbSet.RemoveRange(list);
        }
    }
}
