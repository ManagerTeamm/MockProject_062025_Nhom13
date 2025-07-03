using BackEnd_Api.Dtos;
using BackEnd_Api.Models;
using BackEnd_Api.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Repositories
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
                    CollectedAt = (DateTime)e.CollectedAt,
                    Collector = e.User.FullName,
                    Status = e.Status
                })
                .ToListAsync();
        }

        public async Task<EvidenceDto> CreateEvidenceAsync(CreateEvidenceDto dto)
        {
            var evidence = new Evidence
            {
                EvidenceId = Guid.NewGuid().ToString(),
                Description = dto.Description,
                CollectedAt = dto.CollectedAt,
                CollectedBy = dto.CollectedBy,
                TypeEvidence = dto.TypeEvidence,
                CurrentLocation = dto.CurrentLocation,
                AttachedFile = dto.AttachedFile,
                Status = dto.Status,
                IsDeleted = false
            };

            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == dto.CollectedBy);
            if (user != null)
            {
                evidence.User = user;
            }

            _context.Evidences.Add(evidence);
            await _context.SaveChangesAsync();

            if (!string.IsNullOrEmpty(dto.CaseId))
            {
                var caseEntity = await _context.Cases.FirstOrDefaultAsync(c => c.CaseId == dto.CaseId);
                if (caseEntity != null)
                {
                    var caseEvidence = new CaseEvidence
                    {
                        CaseId = caseEntity.CaseId,
                        EvidenceId = evidence.EvidenceId,
                        IsDeleted = false
                    };
                    _context.CaseEvidences.Add(caseEvidence);
                    await _context.SaveChangesAsync();
                }
            }

            return new EvidenceDto
            {
                EvidenceId = evidence.EvidenceId,
                CaseId = dto.CaseId,
                Description = evidence.Description,
                CollectedAt = evidence.CollectedAt ?? DateTime.MinValue,
                Collector = evidence.CollectedBy,
                Status = evidence.Status
            };
        }

        public async Task<EvidenceDto> GetEvidenceByIdAsync(string id)
        {
            var evidence = await _context.Evidences
                .Include(e => e.CaseEvidences)
                .Include(e => e.User)
                .FirstOrDefaultAsync(e => e.EvidenceId == id && !e.IsDeleted);
            if (evidence == null) return null;
            return new EvidenceDto
            {
                EvidenceId = evidence.EvidenceId,
                CaseId = evidence.CaseEvidences.FirstOrDefault()?.CaseId,
                Description = evidence.Description,
                CollectedAt = evidence.CollectedAt ?? DateTime.MinValue,
                Collector = evidence.CollectedBy,
                Status = evidence.Status
            };
        }

        public async Task<EvidenceDto> UpdateEvidenceAsync(string id, CreateEvidenceDto dto)
        {
            var evidence = await _context.Evidences.Include(e => e.CaseEvidences).FirstOrDefaultAsync(e => e.EvidenceId == id && !e.IsDeleted);
            if (evidence == null) return null;

            evidence.Description = dto.Description;
            evidence.CollectedAt = dto.CollectedAt;
            evidence.CollectedBy = dto.CollectedBy;
            evidence.TypeEvidence = dto.TypeEvidence;
            evidence.CurrentLocation = dto.CurrentLocation;
            evidence.AttachedFile = dto.AttachedFile;
            evidence.Status = dto.Status;

            // Update CaseEvidence nếu CaseId thay đổi
            if (!string.IsNullOrEmpty(dto.CaseId))
            {
                var caseEvidence = evidence.CaseEvidences.FirstOrDefault();
                if (caseEvidence != null && caseEvidence.CaseId != dto.CaseId)
                {
                    caseEvidence.CaseId = dto.CaseId;
                }
                else if (caseEvidence == null)
                {
                    _context.CaseEvidences.Add(new Models.CaseEvidence
                    {
                        CaseId = dto.CaseId,
                        EvidenceId = evidence.EvidenceId,
                        IsDeleted = false
                    });
                }
            }

            await _context.SaveChangesAsync();

            return new EvidenceDto
            {
                EvidenceId = evidence.EvidenceId,
                CaseId = dto.CaseId,
                Description = evidence.Description,
                CollectedAt = evidence.CollectedAt ?? DateTime.MinValue,
                Collector = evidence.CollectedBy,
                Status = evidence.Status
            };
        }

        public async Task<IEnumerable<EvidenceDto>> SearchEvidenceAsync(DateTime? from, DateTime? to, string status)
        {
            var query = _context.Evidences
                .Where(e => !e.IsDeleted);

            if (from.HasValue)
                query = query.Where(e => e.CollectedAt >= from);
            if (to.HasValue)
                query = query.Where(e => e.CollectedAt <= to);
            if (!string.IsNullOrEmpty(status))
                query = query.Where(e => e.Status == status);

            return await query
                .Include(e => e.User)
                .Include(e => e.CaseEvidences)
                .Select(e => new EvidenceDto
                {
                    EvidenceId = e.EvidenceId,
                    CaseId = e.CaseEvidences.FirstOrDefault().CaseId,
                    Description = e.Description,
                    CollectedAt = (DateTime)e.CollectedAt,
                    Collector = e.User.FullName,
                    Status = e.Status
                })
                .ToListAsync();
        }
    }
}
