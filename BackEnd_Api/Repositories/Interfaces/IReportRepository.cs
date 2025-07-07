using BackEnd_Api.Helpers;
using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IReportRepository : IRepository<Report>
    {
        Task CreateReportAsync(Report report);
        Task<object> GetReportDetail(string id);
    }
}
