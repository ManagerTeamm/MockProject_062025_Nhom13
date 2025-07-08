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

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Report Approver")]
    public class ReportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IReportRepository _reportRepository;
        private readonly IVictimRepository _victimRepository;
        private readonly IReportVictimRepository _reportVictimRepository;
        private readonly ISuspectRepository _suspectRepository;
        private readonly IReportSuspectRepository _reportSuspectRepository;
        private readonly IWitnessRepository _witnessRepository;
        private readonly IReportWitnessRepository _reportWitnessRepository;
        private readonly IEvidenceRepository _evidenceRepository;
        private readonly IWebHostEnvironment _env;
        private readonly IUserRepository _userRepository;
        public ReportController(ApplicationDbContext context, IUserRepository userRepository, IReportRepository reportRepository, IVictimRepository victimRepository, IReportVictimRepository reportVictimRepository, IWebHostEnvironment env, ISuspectRepository suspectRepository, IReportSuspectRepository reportSuspectRepository, IWitnessRepository witnessRepository, IReportWitnessRepository reportWitnessRepository, IEvidenceRepository evidenceRepository)
        {
            _context = context;
            _reportRepository = reportRepository;
            _victimRepository = victimRepository;
            _reportVictimRepository = reportVictimRepository;
            _env = env;
            _suspectRepository = suspectRepository;
            _reportSuspectRepository = reportSuspectRepository;
            _witnessRepository = witnessRepository;
            _reportWitnessRepository = reportWitnessRepository;
            _evidenceRepository = evidenceRepository;
            _userRepository = userRepository;
        }
        
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

        [HttpGet("report-detail/{id}")]
        public async Task<IActionResult> GetReportDetail(string id)
        {
            try
            {
                if (id != null)
                {
                    //var userPermissions = _userRepository.GetPermissions();
                    //if (!userPermissions.Contains("Manage_Users"))
                    //    return Forbid("You do not have permission to view users.");

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
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Fail Exception", new[] {e.Message}, 500));
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateReport([FromForm] ReportRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var report = new Report
                {
                    ReportId = Guid.NewGuid().ToString(),
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

                await _reportRepository.CreateReportAsync(report);

                if(request.RelevantParties != null && request.RelevantParties.Any())
                {
                    foreach (var party in request.RelevantParties)
                    {
                        switch (party.Role?.ToLower())
                        {
                            case "victim":
                                var victim = new Victim
                                {
                                    VictimId = Guid.NewGuid().ToString(),
                                    CaseId = null,
                                    Fullname = party.FullName,
                                    National = party.Nationality,
                                    Gender = party.Gender,
                                    Description = party.Statement,
                                    Contact = party.Contact,
                                    Status = "Unknown",
                                    IsDeleted = false
                                };
                                await _victimRepository.CreateVictimAsync(victim);

                                var imageUrls = new List<string>();

                                if (party.Attachments != null && party.Attachments.Any())
                                {
                                    imageUrls = await SaveFileAsync("images", party.Attachments, "victim", victim.VictimId);
                                }

                                //var reportVictim = new ReportVictim
                                //{
                                //    ReportId = report.ReportId,
                                //    VictimId = victim.VictimId,
                                //    ImageUrls = imageUrls.Count > 0
                                //                ? string.Join(";", imageUrls)
                                //                : null,
                                //    IsDeleted = false
                                //};
                                //await _reportVictimRepository.CreateReportVictimAsync(reportVictim);
                                break;
                            case "suspect":
                                var suspect = new Suspect
                                {
                                    SuspectId = Guid.NewGuid().ToString(),
                                    CaseId = null,
                                    Fullname = party.FullName,
                                    Gender = party.Gender,
                                    National = party.Nationality,
                                    Description = party.Statement,
                                    PhoneNumber = party.Contact,
                                    Status = "Unknown",
                                    IsDeleted = false
                                };

                                await _suspectRepository.CreateSuspectAsync(suspect);

                                var imageUrlsSuspect = new List<string>();

                                if (party.Attachments != null && party.Attachments.Any())
                                {
                                    imageUrls = await SaveFileAsync("images", party.Attachments, "suspect", suspect.SuspectId);
                                }


                                //var reportSuspect = new ReportSuspect
                                //{
                                //    ReportId = report.ReportId,
                                //    SuspectId = suspect.SuspectId,
                                //    ImageUrls = imageUrlsSuspect.Count > 0
                                //                ? string.Join(";", imageUrlsSuspect)
                                //                : null,
                                //    IsDeleted = false,
                                //};

                                //await _reportSuspectRepository.CreateReportSuspectAsync(reportSuspect);
                                break;
                            case "witness":
                                var witness = new Witness
                                {
                                    WitnessId = Guid.NewGuid().ToString(),
                                    CaseId = null,
                                    Fullname = party.FullName,
                                    Gender = party.Gender,
                                    National = party.Nationality,
                                    Statement = party.Statement,
                                    Contact = party.Contact,
                                    IsDeleted = false
                                };

                                await _witnessRepository.CreateWitnessAsync(witness);

                                var imageUrlsWitness = new List<string>();

                                if (party.Attachments != null && party.Attachments.Any())
                                {
                                    imageUrls = await SaveFileAsync("images", party.Attachments, "witness", witness.WitnessId);
                                }


                                //var reportWitness = new ReportWitness
                                //{
                                //    ReportId = report.ReportId,
                                //    WitnessId = witness.WitnessId,
                                //    ImageUrls = imageUrlsWitness.Count > 0
                                //                ? string.Join(";", imageUrlsWitness)
                                //                : null,
                                //    IsDeleted = false,
                                //};

                                //await _reportWitnessRepository.CreateReportWitnessAsync(reportWitness);
                                break;
                            case "other":
                                break;
                        }
                    }
                }

                if(request.Evidences != null && request.Evidences.Any())
                {
                    foreach (var evidenceDto in request.Evidences)
                    {
                        var evidence = new Evidence
                        {
                            EvidenceId = Guid.NewGuid().ToString(),
                            ReportId = report.ReportId,
                            TypeEvidence = evidenceDto.TypeOfEvidence,
                            Description = evidenceDto.Description,
                            CollectedAt = DateTime.UtcNow,
                            CurrentLocation = "Unknown",
                            Status = "Pending",
                            IsDeleted = false
                        };

                        var files = new List<string>();

                        if (evidenceDto.Attachments != null && evidenceDto.Attachments.Any())
                        {
                            files = await SaveFileAsync("files",evidenceDto.Attachments, "evidence", evidence.EvidenceId);
                        }

                        evidence.AttachedFile = files.Count > 0
                                            ? string.Join(";", files)
                                            : null;

                        await _evidenceRepository.CreateInitialEvidence(evidence);
                    }
                }
                var response = ApiResponseHelper<string>.SuccessResult(null, "Report created successfully");
                return Ok(response);
            }
            catch (Exception e)
            {
                var response = ApiResponseHelper<string>.FailureResult("Failed to create report", new[] { e.Message }, 500);
                return StatusCode(500, response);
            }
        }

        private async Task<List<string>> SaveFileAsync(string type, List<IFormFile> attachments, string prefix, string id)
        {
            var imageUrls = new List<string>();

            if (attachments == null || !attachments.Any())
                return imageUrls;

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

                        var relativeUrl = $"/images/{validUrl}/{fileName}";
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