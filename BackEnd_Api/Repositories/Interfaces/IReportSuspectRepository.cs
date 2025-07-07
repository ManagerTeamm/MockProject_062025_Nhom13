using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IReportSuspectRepository
    {
        Task CreateReportSuspectAsync(ReportSuspect reportSuspect);
    }
}
