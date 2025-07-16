using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Repositories
{
    public class MedicalRescueSupportAttachmentRepository : Repository<MedicalRescueSupportAttachment>, IMedicalRescueSupportAttachmentRepository
    {
        public MedicalRescueSupportAttachmentRepository(ApplicationDbContext context) : base(context)
        {
        }
        // Additional methods specific to MedicalRescueSupportAttachment can be added here
    }
}
