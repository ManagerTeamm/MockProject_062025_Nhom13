using BackEnd_Api.Dtos;
using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IReportRepository
    {
        Task CreateReportAsync(Report report);
    }
}
