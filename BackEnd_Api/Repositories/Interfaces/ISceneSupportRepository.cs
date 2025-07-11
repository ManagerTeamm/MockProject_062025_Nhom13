using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface ISceneSupportRepository : IRepository<SceneSuport>
    {
        Task<List<SceneSuport>> GetSceneSupportsByCaseIdAsync(string caseId);
    }
}
