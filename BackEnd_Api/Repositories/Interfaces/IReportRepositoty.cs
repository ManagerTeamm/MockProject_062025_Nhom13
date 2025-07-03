using BackEnd_Api.Helpers;
using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IReportRepositoty : IRepository<Report>
    {
        ApiResponseHelper<Report> GetReportDetail(string id);
    }
}
