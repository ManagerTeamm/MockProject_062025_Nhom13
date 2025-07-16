using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Repositories
{
    public class MedicalRescueSupportAttachmentRepository : Repository<MedicalRescueSupportAttachment>, IMedicalRescueSupportAttachmentRepository
    {
        public MedicalRescueSupportAttachmentRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task DeleteAllByRescueSupportIdAsync(string medicalRescueSupportId)
        {
            var list = await _dbSet.Where(x => x.MedicalRescueSupportId == medicalRescueSupportId).ToListAsync();
            if (list.Any())
                _dbSet.RemoveRange(list);
        }
    }
}
