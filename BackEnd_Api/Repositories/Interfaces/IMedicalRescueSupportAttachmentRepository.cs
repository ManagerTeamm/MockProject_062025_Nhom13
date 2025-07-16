using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IMedicalRescueSupportAttachmentRepository : IRepository<MedicalRescueSupportAttachment>
    {
        Task DeleteAllByRescueSupportIdAsync(string medicalRescueSupportId);
    }
}
