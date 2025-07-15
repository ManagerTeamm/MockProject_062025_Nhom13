using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IInitialResponseRepository : IRepository<InitialResponse>
    {
        Task<InitialResponse> GetByCaseIdAsync(string caseId);
    }
}
