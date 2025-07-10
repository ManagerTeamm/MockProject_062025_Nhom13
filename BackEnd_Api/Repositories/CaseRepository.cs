using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Repositories
{
    public class CaseRepository : Repository<Case>, ICaseRepository
    {
        private readonly ApplicationDbContext _context;
        public CaseRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<SceneProtection> CreateProtection(SceneProtection sceneProtection)
        {
            if (sceneProtection == null)
            {
                throw new ArgumentNullException(nameof(sceneProtection));
            }
            await _context.SceneProtections.AddAsync(sceneProtection);
            await _context.SaveChangesAsync();
            return sceneProtection;
        }
    }
}
