using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Repositories
{
    public class ReportVictimRepository : Repository<ReportVictim>, IReportVictimRepository
    {
        public ReportVictimRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task CreateReportVictimAsync(ReportVictim reportVictim)
        {
            await _dbSet.AddAsync(reportVictim);
            await _context.SaveChangesAsync();
        }
        // Additional methods specific to ReportVictim can be added here
    }
}
