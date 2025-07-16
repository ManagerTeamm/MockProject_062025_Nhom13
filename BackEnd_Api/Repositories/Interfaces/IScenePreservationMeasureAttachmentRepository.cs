using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IScenePreservationMeasureAttachmentRepository : IRepository<ScenePreservationMeasureAttachment>
    {
        Task DeleteAllByPreservationMeasureIdAsync(string scenePreservationMeasureId);
    }
}
