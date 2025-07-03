using BackEnd_Api.Dtos;

namespace BackEnd_Api.Services.Interface
{
    public interface IEvidenceRepository
    {
        Task<IEnumerable<EvidenceDto>> GetAllEvidencesAsync();
        Task<EvidenceDto> CreateEvidenceAsync(CreateEvidenceDto dto);
        Task<EvidenceDto> GetEvidenceByIdAsync(string id);
        Task<EvidenceDto> UpdateEvidenceAsync(string id, CreateEvidenceDto dto);
        Task<IEnumerable<EvidenceDto>> SearchEvidenceAsync(DateTime? from, DateTime? to, string status);
    }
}
