using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IMedicalRescueSupportRepository : IRepository<MedicalRescueSupport>
    {
        Task DeleteAllByInitialResponseIdAsync(string initialResponseId);
    }
}
