using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface ICaseRepository : IRepository<Case>
    {
        Task<SceneProtection> CreateProtection(SceneProtection sceneProtection);
    }
}
