using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Repositories
{
    public class ScenePreservationMeasureAttachmentRepository : Repository<ScenePreservationMeasureAttachment>, IScenePreservationMeasureAttachmentRepository
    {
        public ScenePreservationMeasureAttachmentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task DeleteAllByPreservationMeasureIdAsync(string scenePreservationMeasureId)
        {
            var list = await _dbSet.Where(x => x.ScenePreservationMeasureId == scenePreservationMeasureId).ToListAsync();
            if (list.Any())
                _dbSet.RemoveRange(list);
        }
    }
}
