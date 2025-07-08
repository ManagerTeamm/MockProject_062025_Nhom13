using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Repositories
{
    public class ReportPartiesRepository : Repository<ReportParties>, IReportPartiesRepository
    {
        public ReportPartiesRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task CreateReportPartiesAsync(ReportParties reportParties)
        {
            await _dbSet.AddAsync(reportParties);
            await _context.SaveChangesAsync();
        }
    }
}
