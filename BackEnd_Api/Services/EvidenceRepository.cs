using BackEnd_Api.Dtos;
using BackEnd_Api.Models;
using BackEnd_Api.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Services
{
    public class EvidenceRepository : IEvidenceRepository
    {
        private readonly ApplicationDbContext _context;

        public EvidenceRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<EvidenceDto>> GetAllEvidencesAsync()
        {
            return await _context.Evidences
                .Where(e => !e.IsDeleted)
                .Include(e => e.User)
                .Include(e => e.CaseEvidences)
                .Select(e => new EvidenceDto
                {
                    EvidenceId = e.EvidenceId,
                    CaseId = e.CaseEvidences.FirstOrDefault().CaseId,
                    Description = e.Description,
                    CollectedAt = e.CollectedAt,
                    Collector = e.User.FullName,
                    Status = e.Status
                })
                .ToListAsync();
        }

        public async Task<EvidenceDto> CreateEvidenceAsync(CreateEvidenceDto createEvidenceDto)
        {
            var evidence = new Evidence
            {
                EvidenceId = Guid.NewGuid().ToString(),
                Description = createEvidenceDto.Description,
                CollectedAt = createEvidenceDto.CollectedAt,
                CollectedBy = createEvidenceDto.CollectedBy,
                TypeEvidence = createEvidenceDto.TypeEvidence,
                CurrentLocation = createEvidenceDto.CurrentLocation,
                AttachedFile = createEvidenceDto.AttachedFile,
                Status = createEvidenceDto.Status,
                MeasureSurveyId = createEvidenceDto.MeasureSurveyId,
                WarrantResultId = createEvidenceDto.WarrantResultId,
                ReportId = createEvidenceDto.ReportId,
                IsDeleted = false
            };

            var caseEvidence = new CaseEvidence
            {
                CaseId = createEvidenceDto.CaseId,
                EvidenceId = evidence.EvidenceId,
                IsDeleted = false
            };

            _context.Evidences.Add(evidence);
            _context.CaseEvidences.Add(caseEvidence);
            await _context.SaveChangesAsync();

            var user = await _context.Users.FindAsync(evidence.CollectedBy);

            return new EvidenceDto
            {
                EvidenceId = evidence.EvidenceId,
                CaseId = caseEvidence.CaseId,
                Description = evidence.Description,
                CollectedAt = evidence.CollectedAt,
                Collector = user?.FullName ?? "Unknown",
                Status = evidence.Status
            };
        }
    }
}
