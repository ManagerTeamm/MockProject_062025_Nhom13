using Azure;
using BackEnd_Api.Helpers;
using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BackEnd_Api.Repositories
{
    public class ReportReponsitory : Repository<Report>, IReportRepositoty
    {
        public ReportReponsitory(ApplicationDbContext context) : base(context) { }

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
                    
                    // Victims
                    Victims = r.ReportVictims
                        .Where(rv => !rv.IsDeleted)
                        .Select(rv => new
                        {
                            Id = rv.VictimId,
                            FullName = rv.Victim.Fullname,
                            Gender = rv.Victim.Gender,
                            Nationality = rv.Victim.National,
                            Statement = rv.Victim.Description,
                            Contact = rv.Victim.Contact,
                            Injuries = rv.Victim.Injuries,
                            Status = rv.Victim.Status,
                            ImageUrls = rv.ImageUrls
                        }).ToList(),
                    
                    // Witnesses
                    Witnesses = r.ReportWitness
                        .Where(rw => !rw.IsDeleted)
                        .Select(rw => new
                        {
                            Id = rw.WitnessId,
                            FullName = rw.Witness.Fullname,
                            Gender = rw.Witness.Gender,
                            Nationality = rw.Witness.National,
                            Statement = rw.Witness.Statement,
                            Contact = rw.Witness.Contact,
                            Description = rw.Witness.Description,
                            ImageUrls = rw.ImageUrls
                        }).ToList(),
                    
                    // Suspects
                    Suspects = r.ReportSuspects
                        .Where(rs => !rs.IsDeleted)
                        .Select(rs => new
                        {
                            Id = rs.SuspectId,
                            FullName = rs.Suspect.Fullname,
                            Gender = rs.Suspect.Gender,
                            Nationality = rs.Suspect.National,
                            Description = rs.Suspect.Description,
                            Status = rs.Suspect.Status,
                            Address = rs.Suspect.Address,
                            PhoneNumber = rs.Suspect.PhoneNumber,
                            ImageUrls = rs.ImageUrls
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
