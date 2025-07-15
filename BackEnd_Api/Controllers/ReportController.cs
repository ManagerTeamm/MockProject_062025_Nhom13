using BackEnd_Api.Dtos.ReportDtos;
using BackEnd_Api.Helpers;
using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using BackEnd_Api.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Security.Claims;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Report Approver, Admin")]
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;
        private readonly IEvidenceRepository _evidenceRepository;
        private readonly IWebHostEnvironment _env;
        private readonly IUserRepository _userRepository;
        private readonly IReportPartiesRepository _reportPartiesRepository;
        public ReportController(ApplicationDbContext context, IUserRepository userRepository, IReportRepository reportRepository, IVictimRepository victimRepository, IWebHostEnvironment env, ISuspectRepository suspectRepository, IWitnessRepository witnessRepository, IEvidenceRepository evidenceRepository, IReportPartiesRepository reportPartiesRepository)
        {
            _reportRepository = reportRepository;
            _env = env;
            _evidenceRepository = evidenceRepository;
            _userRepository = userRepository;
            _reportPartiesRepository = reportPartiesRepository;
        }

        /// <summary>
        /// Retrieves all reports from the system.
        /// </summary>
        /// <returns>
        /// Returns an HTTP 200 OK response with a list of all reports if successful,
        /// or an HTTP 500 Internal Server Error if an exception occurs.
        /// </returns>
        /// <exception cref="Exception">
        /// Thrown when an error occurs while retrieving reports from the repository.
        /// </exception>
        [HttpGet("get-reports")]
        public async Task<IActionResult> GetReports()
        {
            try
            {
                var reports = await _reportRepository.GetAllAsync();

                var response = ApiResponseHelper<List<Report>>.SuccessResult((List<Report>)reports, "Get reports completed");

                return Ok(response);
            }
            catch (Exception e)
            {
                var response = ApiResponseHelper<string>.FailureResult("Error when find reports", new[] { e.Message }, 500);
                return StatusCode(500, response);
            }
        }

        /// <summary>
        /// Retrieves detailed information for a specific report by ID.
        /// </summary>
        /// <param name="id">The unique identifier of the report to retrieve.</param>
        /// <returns>
        /// Returns an HTTP 200 OK response with the report details if found,
        /// an HTTP 404 Not Found if the report doesn't exist,
        /// or an HTTP 500 Internal Server Error if an exception occurs.
        /// </returns>
        /// <exception cref="Exception">
        /// Thrown when an error occurs while retrieving the report from the repository.
        /// </exception>
        [HttpGet("report-detail/{id}")]
        public async Task<IActionResult> GetReportDetail(string id)
        {
            try
            {
                if (!string.IsNullOrEmpty(id))
                {
                    var reportDetail = await _reportRepository.GetReportDetail(id);

                    if (reportDetail == null)
                    {
                        return NotFound(ApiResponseHelper<string>.NotFoundResult("Not found report id = " + id));
                    }

                    var response = ApiResponseHelper<object>.SuccessResult(reportDetail);

                    return Ok(response);
                }
                return NotFound(ApiResponseHelper<string>.NotFoundResult("Not found report id = " + id));
            }
            catch (Exception e)
            {
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Fail Exception", new[] { e.Message }, 500));
            }
        }

        /// <summary>
        /// Approves a report and creates a new case from it.
        /// </summary>
        /// <param name="id">The unique identifier of the report to approve.</param>
        /// <returns>
        /// Returns an HTTP 200 OK response with the newly created case if successful,
        /// an HTTP 400 Bad Request if the report cannot be approved (e.g., invalid ID),
        /// or an HTTP 500 Internal Server Error if an unexpected exception occurs.
        /// </returns>
        /// <exception cref="ArgumentException">
        /// Thrown when the report ID is invalid or the report cannot be approved.
        /// </exception>
        /// <exception cref="Exception">
        /// Thrown when an unexpected error occurs during the approval process.
        /// </exception>
        [HttpPost("report-approve/{id}")]
        public async Task<IActionResult> ApproveReport(string id)
        {
            try
             {
                var newCase = await _reportRepository.ApproveReport(id);

                return Ok(ApiResponseHelper<object>.SuccessResult(newCase));
            }catch(ArgumentException e)
            {
                return BadRequest(ApiResponseHelper<string>.NotFoundResult(e.Message));
            }
            catch(Exception e)
            {
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Fail Exception", new[] { e.Message }, 500));
            }
        }

        [HttpPatch("report-decline/{id}")]
        public async Task<IActionResult> DeclienReport(string id)
        {
            try
            {
                if (!string.IsNullOrEmpty(id))
                {
                    var report = await _reportRepository.DeclineReport(id);

                    if(report != null)
                    {
                        return Ok(ApiResponseHelper<object>.SuccessResult(report));
                    }
                    return NotFound(ApiResponseHelper<object>.NotFoundResult("Not found report id = " + id));
                }
                return BadRequest(ApiResponseHelper<string>.NotFoundResult("Id report not null or empty"));
            }
            catch(Exception e)
            {
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Fail Exception", new[] { e.Message }, 500));
            }
        }

        /// Handles the creation of a new report including reporter details, incident information,
        /// relevant parties, and attached evidences. Accepts data from a form submission.
        /// </summary>
        /// <param name="request">The report request DTO containing all necessary report data.</param>
        /// <returns>Returns a success response if the report is created successfully, otherwise a bad request or internal server error.</returns>
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateReport([FromForm] ReportRequestDto request)
        {
            // Validate model state before proceeding
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Initialize and populate the report entity with provided incident and reporter details
                var report = new Report
                {
                    ReportId = "REPORT_" + DateTime.Now.ToString("yyyyMMdd_HHmmss_fff"),
                    CaseId = null,
                    TypeReport = request.Incident.TypeOfCrime,
                    Severity = request.Incident.Severity,
                    Description = request.Incident.IncidentDescription,
                    CaseLocation = request.Incident.DetailedAddress ?? "Unknown",
                    TimeOfOccurrence = request.Incident.OccurredAt,
                    ReportedAt = DateTime.UtcNow,
                    ReporterFullname = request.Reporter.FullName,
                    ReporterEmail = request.Reporter.Email,
                    ReporterPhoneNumber = request.Reporter.PhoneNumber,
                    RelationshipToIncident = request.Reporter.Relation,
                    AddressReported = request.Reporter.Address,
                    OfficerApproveId = null,
                    IsDeleted = false
                };

                // Save the report to the database
                await _reportRepository.CreateReportAsync(report);

                // If there are relevant parties involved in the incident, save their details
                if (request.RelevantParties != null && request.RelevantParties.Any())
                {
                    foreach (var party in request.RelevantParties)
                    {
                        var relevantParty = new ReportParties
                        {
                            ReportPartiesId = "REPORT_PARTY_" + DateTime.Now.ToString("yyyyMMdd_HHmmss_fff"),
                            ReportId = report.ReportId,
                            FullName = party.FullName,
                            TypeOfParties = party.Role ?? "unknown",
                            Gender = party.Gender,
                            National = party.Nationality,
                            Description = party.Statement,
                            IsDeleted = false
                        };

                        await _reportPartiesRepository.CreateReportPartiesAsync(relevantParty);
                    }
                }

                // If there are evidence items provided, process and save them
                if (request.Evidences != null && request.Evidences.Any())
                {
                    foreach (var evidenceDto in request.Evidences)
                    {
                        if (evidenceDto == null)
                            continue;

                        var evidence = new Evidence
                        {
                            EvidenceId = "EVIDENCE_" + DateTime.Now.ToString("yyyyMMdd_HHmmss_fff"),
                            ReportId = report.ReportId,
                            TypeEvidence = evidenceDto.TypeOfEvidence,
                            Description = evidenceDto.Description,
                            CollectedAt = DateTime.UtcNow,
                            CurrentLocation = evidenceDto.EvidenceLocation ?? "Unknown",
                            Status = "Pending",
                            IsDeleted = false
                        };

                        // Save attached files if any and update the evidence record
                        var files = new List<string>();

                        if (evidenceDto.Attachments != null && evidenceDto.Attachments.Any())
                        {
                            files = await SaveFileAsync("files", evidenceDto.Attachments, "evidence", evidence.EvidenceId);
                        }

                        evidence.AttachedFile = files.Count > 0
                            ? string.Join(";", files)
                            : null;

                        await _evidenceRepository.CreateEvidenceAsync(evidence);
                    }
                }

                // Return success response
                var response = ApiResponseHelper<string>.SuccessResult(null, "Report created successfully");
                return Ok(response);
            }
            catch (Exception e)
            {
                // Return internal server error with exception message
                var response = ApiResponseHelper<string>.FailureResult("Failed to create report", new[] { e.Message }, 500);
                return StatusCode(500, response);
            }
        }


        private async Task<List<string>> SaveFileAsync(string type, List<IFormFile> attachments, string prefix, string id)
        {
            var imageUrls = new List<string>();

            if (attachments == null || !attachments.Any())
                return imageUrls;

            var rootPath = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            Directory.CreateDirectory(rootPath);

            var dateFolder = DateTime.UtcNow.ToString("yyyyMMdd");
            var validUrl = $"{prefix}_{dateFolder}";
            var saveDir = Path.Combine(_env.WebRootPath, type, validUrl);
            Directory.CreateDirectory(saveDir);

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp",
                                            ".pdf", ".psd", ".doc", ".docx", ".ppt", ".pptx", ".ai"};

            foreach (var file in attachments)
            {
                if (file.Length > 0)
                {
                    var originalFileName = Path.GetFileName(file.FileName);
                    var ext = Path.GetExtension(originalFileName).ToLower();

                    if (!allowedExtensions.Contains(ext))
                        continue;

                    var fileName = $"{prefix}_{id}_{Guid.NewGuid()}{ext}";
                    var physicalPath = Path.Combine(saveDir, fileName);

                    try
                    {
                        using (var stream = new FileStream(physicalPath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }

                        var relativeUrl = $"/{type}/{validUrl}/{fileName}";
                        imageUrls.Add(relativeUrl);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error saving file {originalFileName}: {ex.Message}");
                    }
                }
            }

            return imageUrls;
        }


    }
}