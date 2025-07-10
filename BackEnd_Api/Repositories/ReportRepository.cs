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

        /// <summary>
        /// Initializes a new instance of the ReportRepository class.
        /// </summary>
        /// <param name="context">The database context for data access operations.</param>
        /// <param name="caseRepository">Repository for managing Case entities.</param>
        /// <param name="httpContextAccessor">Accessor for HTTP context to retrieve user information.</param>
        /// <param name="userRepository">Repository for managing User entities.</param>
        public ReportRepository(ApplicationDbContext context, ICaseRepository caseRepository,
                           IHttpContextAccessor httpContextAccessor, IUserRepository userRepository) : base(context) 
        {
            _caseRepository = caseRepository;
            _httpContextAccessor = httpContextAccessor;
            _userRepository = userRepository;
        }

        /// <summary>
        /// Approves a report and creates a new case from it.
        /// This method performs a transactional operation to ensure data consistency.
        /// </summary>
        /// <param name="id">The unique identifier of the report to approve.</param>
        /// <returns>
        /// Returns an object containing the details of the newly created case,
        /// including CaseId, Status, CreateAt, and IsDeleted properties.
        /// </returns>
        /// <exception cref="ArgumentException">
        /// Thrown when the id parameter is null or empty, 
        /// when the report is not found, 
        /// or when the report has already been approved.
        /// </exception>
        /// <exception cref="Exception">
        /// Thrown when any database operation fails during the transaction.
        /// </exception>
        public async Task<object> ApproveReport(string id)
        {
            // Validate input parameter
            if (string.IsNullOrEmpty(id))
                throw new ArgumentException("Empty id", nameof(id));

            // Retrieve the report from database
            var report = await GetByIdAsync(id);

            if (report == null)
                throw new ArgumentException($"Not found ID: {id}");

            // Check if report is already approved
            if (report.CaseId != null)
            {
                throw new ArgumentException($"Report Approved: {id}");
            }

            // Begin database transaction to ensure data consistency
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // Create new case with unique identifier
                var newCase = new Case
                {
                    CaseId = $"CASE_{DateTime.Now:yyyyMMddHHmmss}_{Random.Shared.Next(1000, 9999)}",
                    Status = "New Case",
                    CreateAt = DateTime.Now,
                    IsDeleted = false
                };

                // Add new case to database
                await _caseRepository.AddAsync(newCase);

                // Update report with approval information
                var userName = _httpContextAccessor.HttpContext?.User.FindFirst("name")?.Value;
                report.OfficerApproveId = userName;
                report.CaseId = newCase.CaseId;

                // Save changes to report
                await Update(report);

                // Commit transaction if all operations succeed
                await transaction.CommitAsync();

                // Return case details
                return new
                {
                    CaseId = newCase.CaseId,
                    Status = newCase.Status,
                    CreateAt = newCase.CreateAt,
                    IsDeleted = newCase.IsDeleted
                };
            }
            catch (Exception)
            {
                // Rollback transaction if any operation fails
                await transaction.RollbackAsync();
                throw;
            }
        }

        /// <summary>
        /// Creates a new report in the database.
        /// </summary>
        /// <param name="report">The report entity to be created.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        /// <exception cref="ArgumentNullException">
        /// Thrown when the report parameter is null.
        /// </exception>
        /// <exception cref="DbUpdateException">
        /// Thrown when a database update error occurs during the save operation.
        /// </exception>
        public async Task CreateReportAsync(Report report)
        {
            await _dbSet.AddAsync(report);
            await _context.SaveChangesAsync();
        }

        public async Task<Report> DeclineReport(string id)
        {
            var report = await GetByIdAsync(id);

            if(report != null)
            {
                var userName = _httpContextAccessor.HttpContext?.User.FindFirst("name")?.Value;
                report.OfficerApproveId = userName;
                await Delete(report);
            }

            return report;
        }

        /// <summary>
        /// Retrieves detailed information for a specific report including related entities.
        /// This method returns comprehensive report data including reporter information,
        /// officer approval details, case information, parties involved, and evidences.
        /// </summary>
        /// <param name="id">The unique identifier of the report to retrieve.</param>
        /// <returns>
        /// Returns an anonymous object containing all report details and related entities,
        /// or null if the report is not found or has been deleted.
        /// </returns>
        /// <exception cref="Exception">
        /// Thrown when a database error occurs during the query execution.
        /// </exception>
        /// <remarks>
        /// The returned object includes:
        /// - Basic report information (ID, type, severity, description, location, dates)
        /// - Reporter contact and personal information
        /// - Officer approval details (if approved)
        /// - Associated case information (if case exists)
        /// - List of involved parties with their details
        /// - List of evidences with attachment information and collector details
        /// </remarks>
        public async Task<object> GetReportDetail(string id)
        {
            var reportDetail = await _dbSet
                .Where(r => r.ReportId == id)
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

                    // Related Parties Information
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

                    // Evidence Information
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
