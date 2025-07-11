using BackEnd_Api.Dtos;
using BackEnd_Api.Models;
using BackEnd_Api.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Repositories
{
    public class EvidenceRepository : Repository<Evidence>, IEvidenceRepository
    {
        private readonly ApplicationDbContext _context;

        public EvidenceRepository(ApplicationDbContext context) : base(context)
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
            // Validate unique EvidenceId
            if (await _context.Evidences.AnyAsync(e => e.EvidenceId == dto.EvidenceId && !e.IsDeleted))
                throw new Exception("EvidenceId must be unique.");

            // Validate CollectedAt không trong tương lai
            if (dto.CollectedAt > DateTime.UtcNow)
                throw new Exception("CollectedAt cannot be in the future.");

            // Validate tồn tại User
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == dto.CollectedBy && !u.IsDeleted);
            if (user == null)
                throw new Exception("CollectedBy user does not exist.");

            // Validate tồn tại Case
            var caseEntity = await _context.Cases.FirstOrDefaultAsync(c => c.CaseId == dto.CaseId && !c.IsDeleted);
            if (caseEntity == null)
                throw new Exception("CaseId does not exist.");

            var evidence = new Evidence
            {
                EvidenceId = dto.EvidenceId,
                Description = dto.Description,
                CollectedAt = dto.CollectedAt,
                CollectedBy = dto.CollectedBy,
                TypeEvidence = dto.TypeEvidence,
                CurrentLocation = dto.CurrentLocation,
                AttachedFile = dto.AttachedFile,
                Status = dto.Status,
                IsDeleted = false,
                User = user
            };

            _context.Evidences.Add(evidence);
            await _context.SaveChangesAsync();

            var caseEvidence = new CaseEvidence
            {
                CaseId = caseEntity.CaseId,
                EvidenceId = evidence.EvidenceId,
                IsDeleted = false
            };
            _context.CaseEvidences.Add(caseEvidence);
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

        public async Task<EvidenceDto> GetEvidenceByIdAsync(string id)
        {
            var evidence = await _context.Evidences
                .Include(e => e.CaseEvidences)
                .Include(e => e.User)
                .Include(e => e.SuspectEvidences)
                    .ThenInclude(se => se.Suspect)
                .FirstOrDefaultAsync(e => e.EvidenceId == id && !e.IsDeleted);
            if (evidence == null) return null;

            var caseId = evidence.CaseEvidences.FirstOrDefault()?.CaseId;
            CaseInfoDto caseInfo = null;
            if (!string.IsNullOrEmpty(caseId))
            {
                var caseEntity = await _context.Cases.FirstOrDefaultAsync(c => c.CaseId == caseId && !c.IsDeleted);
                if (caseEntity != null)
                {
                    caseInfo = new CaseInfoDto
                    {
                        CaseId = caseEntity.CaseId,
                        Type = caseEntity.TypeCase,
                        Severity = caseEntity.Severity,
                        Status = caseEntity.Status,
                        Summary = caseEntity.Summary
                    };
                }
            }

            var suspect = evidence.SuspectEvidences.FirstOrDefault(se => !se.IsDeleted)?.Suspect;
            SuspectInfoDto suspectInfo = null;
            if (suspect != null && !suspect.IsDeleted)
            {
                suspectInfo = new SuspectInfoDto
                {
                    SuspectId = suspect.SuspectId,
                    FullName = suspect.Fullname,
                    Status = suspect.Status
                };
            }

            return new EvidenceDto
            {
                EvidenceId = evidence.EvidenceId,
                CaseId = caseId,
                Description = evidence.Description,
                CollectedAt = evidence.CollectedAt ?? DateTime.MinValue,
                Collector = evidence.CollectedBy,
                Status = evidence.Status,
                CaseInfo = caseInfo,
                SuspectInfo = suspectInfo
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

        
        public async Task<object> GetEvidencesPaginatedAsync(int page, int pageSize)
        {
            var totalCount = await _context.Evidences.Where(e => !e.IsDeleted).CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            var skip = (page - 1) * pageSize;

            var evidences = await _context.Evidences
                .Where(e => !e.IsDeleted)
                .Include(e => e.User)
                .Include(e => e.CaseEvidences)
                .Skip(skip)
                .Take(pageSize)
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

            return new
            {
                Data = evidences,
                TotalCount = totalCount,
                TotalPages = totalPages,
                CurrentPage = page,
                PageSize = pageSize,
                HasNextPage = page < totalPages,
                HasPreviousPage = page > 1
            };
        }


        public async Task CreateEvidenceAsync(Evidence evidence)
        {
            await _dbSet.AddAsync(evidence);
            await _context.SaveChangesAsync();
        }

        public async Task<object> FilterEvidencesAsync(EvidenceFilterDto filterDto)
        {
            var query = _context.Evidences
                .Where(e => !e.IsDeleted)
                .Include(e => e.User)
                .Include(e => e.CaseEvidences)
                .AsQueryable();

            // Filter theo Status
            if (!string.IsNullOrEmpty(filterDto.Status))
            {
                query = query.Where(e => e.Status == filterDto.Status);
            }

            // Filter theo CollectedAt (một ngày cụ thể)
            if (filterDto.CollectedAt.HasValue)
            {
                var filterDate = filterDto.CollectedAt.Value.Date;
                query = query.Where(e => e.CollectedAt.HasValue && e.CollectedAt.Value.Date == filterDate);
            }

            // Get total count before pagination
            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / filterDto.PageSize);
            var skip = (filterDto.Page - 1) * filterDto.PageSize;

            // Apply pagination
            var evidences = await query
                .Skip(skip)
                .Take(filterDto.PageSize)
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

            return new
            {
                Data = evidences,
                TotalCount = totalCount,
                TotalPages = totalPages,
                CurrentPage = filterDto.Page,
                PageSize = filterDto.PageSize,
                HasNextPage = filterDto.Page < totalPages,
                HasPreviousPage = filterDto.Page > 1,
                Filters = new
                {
                    Status = filterDto.Status,
                    CollectedAt = filterDto.CollectedAt
                }
            };
        }
    }
}
