using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IScenePreservationMeasureRepository : IRepository<ScenePreservationMeasure>
    {
        Task DeleteAllByInitialResponseIdAsync(string initialResponseId);
    }
}
