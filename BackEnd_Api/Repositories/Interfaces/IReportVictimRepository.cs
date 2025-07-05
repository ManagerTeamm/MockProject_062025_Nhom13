using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IReportVictimRepository
    {
        Task CreateReportVictimAsync(ReportVictim reportVictim);
    }
}
