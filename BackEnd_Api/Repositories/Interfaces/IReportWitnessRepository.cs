using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IReportWitnessRepository
    {
        Task CreateReportWitnessAsync(ReportWitness reportWitness);
    }
}
