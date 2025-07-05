using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Repositories
{
    public class VictimRepository : Repository<Victim>, IVictimRepository
    {
        public VictimRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task CreateVictimAsync(Victim victim)
        {
            await _dbSet.AddAsync(victim);
            await _context.SaveChangesAsync();
        }
    }
}
