using BackEnd_Api.Dtos;
using BackEnd_Api.Models;

namespace BackEnd_Api.Services.Interface
{
    public interface IEvidenceRepository
    {
        Task<IEnumerable<EvidenceDto>> GetAllEvidencesAsync();
        Task<EvidenceDto> CreateEvidenceAsync(CreateEvidenceDto createEvidenceDto);
        Task CreateInitialEvidence(Evidence evidence);
    }
}
