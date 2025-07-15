using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IUserCaseRepository : IRepository<UserCase>
    {
        Task DeleteAllByCaseIdAsync(string caseId);
    }
}
