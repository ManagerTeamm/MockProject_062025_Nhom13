using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace BackEnd_Api.Repositories
{
    public class ReportRepository : Repository<Report>, IReportRepository
    {
        private readonly ICaseRepository _caseRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IUserRepository _userRepository;
        public ReportRepository(ApplicationDbContext context, ICaseRepository caseRepository,
                           IHttpContextAccessor httpContextAccessor, IUserRepository userRepository) : base(context) 
        {
            _caseRepository = caseRepository;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        public async Task<object> ApproveReport(string id)
        {
            if (string.IsNullOrEmpty(id))
                throw new ArgumentException("Empty id", nameof(id));

            var report = await GetByIdAsync(id);

            if (report == null)
                throw new ArgumentException($"Not found ID: {id}");

            if (report.CaseId != null)
            {
                throw new ArgumentException($"Report Approved: {id}");
            }

            // Bắt đầu transaction
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var newCase = new Case
                {
                    CaseId = $"CASE_{DateTime.Now:yyyyMMddHHmmss}_{Random.Shared.Next(1000, 9999)}",
                    TypeCase = report.TypeReport,
                    Severity = report.Severity,
                    Status = "New Case",
                    CreateAt = DateTime.Now,
                    IsDeleted = false
                };

                // Thêm case (có auto SaveAsync trong AddAsync)
                await _caseRepository.AddAsync(newCase);

                // Update OfficerApprove
                var userName = _httpContextAccessor.HttpContext?.User.FindFirst("name")?.Value;
                report.OfficerApproveId = userName;
                report.CaseId = newCase.CaseId;

                // Save change (có auto SaveAsync trong Update)
                await Update(report);

                // Commit transaction nếu tất cả thành công
                await transaction.CommitAsync();

                return new
                {
                    CaseId = newCase.CaseId,
                    TypeCase = newCase.TypeCase,
                    Severity = newCase.Severity,
                    Status = newCase.Status,
                    CreateAt = newCase.CreateAt,
                    IsDeleted = newCase.IsDeleted
                };
            }
            catch (Exception)
            {
                // Rollback nếu có lỗi
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task CreateReportAsync(Report report)
        {
            await _dbSet.AddAsync(report);
            await _context.SaveChangesAsync();
        }

        public async Task<object> GetReportDetail(string id)
        {
            var reportDetail = await _dbSet
                .Where(r => r.ReportId == id && !r.IsDeleted)
                .Select(r => new
                {
                    // Basic Report Info
                    ReportId = r.ReportId,
                    CaseId = r.CaseId,
                    TypeReport = r.TypeReport,
                    Severity = r.Severity,
                    Description = r.Description,
                    CaseLocation = r.CaseLocation,
                    ReportedAt = r.ReportedAt,
                    TimeOfOccurrence = r.TimeOfOccurrence,

                    // Reporter Info
                    ReporterFullname = r.ReporterFullname,
                    ReporterEmail = r.ReporterEmail,
                    ReporterPhoneNumber = r.ReporterPhoneNumber,
                    RelationshipToIncident = r.RelationshipToIncident,
                    AddressReported = r.AddressReported,

                    // Officer Approve Info
                    OfficerApprove = r.User != null ? new
                    {
                        UserName = r.User.UserName,
                        FullName = r.User.FullName,
                        Email = r.User.Email
                    } : null,

                    // Case Info
                    Case = r.Case != null ? new
                    {
                        CaseId = r.Case.CaseId,
                        TypeCase = r.Case.TypeCase,
                        Severity = r.Case.Severity,
                        Status = r.Case.Status,
                        Summary = r.Case.Summary,
                        CreateAt = r.Case.CreateAt
                    } : null,

                    ReportParties = r.ReportParties
                        .Where(p => !p.IsDeleted)
                        .Select(p => new
                        {
                            Id = p.ReportPartiesId,
                            FullName = p.FullName,
                            TypeOfParties = p.TypeOfParties,
                            Gender = p.Gender,
                            National = p.National,
                            Description = p.Description
                        }).ToList(),

                    // Evidences
                    Evidences = r.Evidences
                        .Where(e => !e.IsDeleted)
                        .Select(e => new
                        {
                            Id = e.EvidenceId,
                            Type = e.TypeEvidence,
                            Location = e.CurrentLocation,
                            Description = e.Description,
                            CollectedAt = e.CollectedAt,
                            Status = e.Status,
                            Attachments = e.AttachedFile,
                            CollectedBy = new
                            {
                                UserName = e.User.UserName,
                                FullName = e.User.FullName
                            }
                        }).ToList()
                })
                .FirstOrDefaultAsync();

            return reportDetail;
        }
    }
}
