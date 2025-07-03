using BackEnd_Api.Dtos;

namespace BackEnd_Api.Services.Interface
{
    public interface IEvidenceRepository
    {
        Task<IEnumerable<EvidenceDto>> GetAllEvidencesAsync();
        Task<EvidenceDto> CreateEvidenceAsync(CreateEvidenceDto createEvidenceDto);
    }
}
