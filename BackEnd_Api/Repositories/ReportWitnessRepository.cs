using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Repositories
{
    public class ReportWitnessRepository : Repository<ReportWitness>, IReportWitnessRepository
    {
        public ReportWitnessRepository(ApplicationDbContext context) : base(context)
        {
        }
        public async Task CreateReportWitnessAsync(ReportWitness reportWitness)
        {
            await _dbSet.AddAsync(reportWitness);
            await _context.SaveChangesAsync();
        }
    }
}
