using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Repositories
{
    public class SuspectRepository : Repository<Suspect>, ISuspectRepository
    {
        public SuspectRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task CreateSuspectAsync(Suspect suspect)
        {
            await _dbSet.AddAsync(suspect);
            await _context.SaveChangesAsync();
        }
    }
}
