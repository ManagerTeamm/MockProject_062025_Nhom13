using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Repositories
{
    public class WitnessRepository : Repository<Witness>, IWitnessRepository
    {
        public WitnessRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task CreateWitnessAsync(Witness witness)
        {
            await _dbSet.AddAsync(witness);
            await _context.SaveChangesAsync();
        }
    }
}
