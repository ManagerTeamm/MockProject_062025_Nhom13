using BackEnd_Api.Dtos;
using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface ICaseRepository : IRepository<Case>
    {
        Task<PaginatedResultDto<CaseListItemDto>> GetCasesAsync(CaseFilterDto filter);
        Task<SceneProtection> CreateProtection(SceneProtection sceneProtection);
    }
}
