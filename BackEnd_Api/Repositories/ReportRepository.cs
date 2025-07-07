using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Repositories
{
    public class ReportRepository : Repository<Report>, IReportRepository
    {
        public ReportRepository(ApplicationDbContext context) : base(context) { }

        public async Task CreateReportAsync(Report report)
        {
            await _dbSet.AddAsync(report);
            await _context.SaveChangesAsync();
        }
    }
}
