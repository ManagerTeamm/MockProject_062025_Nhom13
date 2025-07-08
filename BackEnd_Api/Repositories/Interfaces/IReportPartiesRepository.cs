using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IReportPartiesRepository
    {
        Task CreateReportPartiesAsync(ReportParties reportParties);
    }
}
