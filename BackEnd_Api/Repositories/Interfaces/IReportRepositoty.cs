using BackEnd_Api.Helpers;
using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IReportRepositoty : IRepository<Report>
    {
        Task<object> GetReportDetail(string id);
    }
}
