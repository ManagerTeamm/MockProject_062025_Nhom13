using System.Collections.Generic;
using System.Threading.Tasks;
using BackEnd_Api.Dtos;
using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface ISuspectRepository : IRepository<Suspect>
    {
        Task<List<Suspect>> GetAllSuspectsAsync();
        Task<(List<Suspect> suspects, int totalCount)> GetSuspectsPaginatedAsync(int page, int pageSize);
        Task<(List<Suspect> suspects, int totalCount)> FilterSuspectsAsync(string status, DateTime? catchTime, int page, int pageSize);
        Task AddSuspectAsync(CreateSuspectDto dto);
    }
} 