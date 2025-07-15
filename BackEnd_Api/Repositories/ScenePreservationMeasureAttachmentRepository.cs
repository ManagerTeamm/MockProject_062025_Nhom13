using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Repositories
{
    public class ScenePreservationMeasureAttachmentRepository : Repository<ScenePreservationMeasureAttachment>, IScenePreservationMeasureAttachmentRepository
    {
        public ScenePreservationMeasureAttachmentRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
