using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface ISceneProtectionRepository : IRepository<SceneProtection>
    {
        Task<List<SceneProtection>> GetSceneProtectionsByCaseIdAsync(string caseId);
    }
}
