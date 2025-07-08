// Repositories/Interfaces/IPatrolOfficerRepository.cs
using BackEnd_Api.Models;
using BackEnd_Api.Dtos; // Import namespace chứa DTO

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IPatrolOfficerRepository : IRepository<User>
    {
        // Sửa kiểu trả về thành PatrolOfficerDto.PaginatedResult<PatrolOfficerDto>
        Task<PatrolOfficerDto.PaginatedResult<PatrolOfficerDto>> GetPaginatedPatrolOfficersAsync(
            string? searchQuery,
            string? presentStatus,
            string? zone,
            int pageNumber,
            int pageSize);
    }
}