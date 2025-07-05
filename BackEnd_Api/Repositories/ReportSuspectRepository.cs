using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Repositories
{
    public class ReportSuspectRepository : Repository<ReportSuspect>, IReportSuspectRepository
    {
        public ReportSuspectRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task CreateReportSuspectAsync(ReportSuspect reportSuspect)
        {
            await _dbSet.AddAsync(reportSuspect);
            await _context.SaveChangesAsync();
        }
    }
}
