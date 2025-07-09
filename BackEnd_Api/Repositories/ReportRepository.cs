using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Repositories
{
    public class ReportRepository : Repository<Report>, IReportRepository
    {
        public ReportRepository(ApplicationDbContext context) : base(context) { }

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
