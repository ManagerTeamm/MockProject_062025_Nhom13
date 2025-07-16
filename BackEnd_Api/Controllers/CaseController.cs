using BackEnd_Api.Attributes;
using BackEnd_Api.Dtos;
using BackEnd_Api.Dtos.Cases;
using BackEnd_Api.Helpers;
using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Security.Policy;
using static BackEnd_Api.Dtos.Cases.InitialResponseDto;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaseController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly IUnitOfWork _unitOfWork;

        public CaseController(IWebHostEnvironment env, IUnitOfWork unitOfWork)
        {
            _env = env;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Lấy danh sách các vụ án với khả năng tìm kiếm, phân trang và sắp xếp.
        /// </summary>
        /// <param name="filter">Đối tượng chứa các tham số lọc, phân trang và sắp xếp (lấy từ query string).</param>
        /// <returns>Một PaginatedResultDto chứa danh sách các vụ án và thông tin phân trang.</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PaginatedResultDto<CaseListItemDto>))]
        public async Task<ActionResult<PaginatedResultDto<CaseListItemDto>>> GetCases([FromQuery] CaseFilterDto filter)
        {
            // Gọi phương thức trực tiếp từ Repository
            var result = await _unitOfWork.CaseRepository.GetCasesAsync(filter);
            return Ok(result);
        }

        [HttpGet("/api/initial-response/{caseId}")]
        [HasPermission("Edit_Case")]
        public async Task<ActionResult> GetInitialResponse(string caseId)
        {
            if (string.IsNullOrEmpty(caseId))
            {
                return new JsonResult(ApiResponseHelper<InitialResponseDto>.FailureResult("CaseId is required."));
            }

            var caseModel = await _unitOfWork.CaseRepository.GetByIdAsync(caseId);
            if (caseModel == null)
            {
                return new JsonResult(ApiResponseHelper<InitialResponseDto>.NotFoundResult("Case not found."));
            }

            var initialResponse = await _unitOfWork.InitialResponseRepository.GetByCaseIdAsync(caseId);
            if (initialResponse == null)
            {
                return new JsonResult(ApiResponseHelper<InitialResponseDto>.NotFoundResult("Initial response not found."));
            }

            var dto = new InitialResponseDto
            {
                InitialResponseId = initialResponse.InitialResponseId,
                CaseId = initialResponse.CaseId,
                DispatchTime = initialResponse.DispatchTime != default ? initialResponse.DispatchTime.ToString("yyyy-MM-dd HH:mm:ss") : null,
                ArrivalTime = initialResponse.ArrivalTime != default ? initialResponse.ArrivalTime.ToString("yyyy-MM-dd HH:mm:ss") : null,
                SceneAssessment = initialResponse.PreliminaryAssessment
            };

            // Get assigned officers
            var userCases = await _unitOfWork.UserCaseRepository.FindWithIncludeAsync(
                            x => x.CaseId == caseId,
                            x => x.User,
                            x => x.User.Role
                        );

            dto.AssignedOfficers = userCases.Select(uc => new InitialResponseDto.OfficerDto
            {
                UserName = uc.OfficerId,
                FullName = uc.User?.FullName ?? "Unknown",
                Role = uc.User?.Role.Description ?? "Unknown",
                PhoneNumber = uc.User?.PhoneNumber ?? "Unknown"
            }).ToList();

            var baseUrl = $"{Request.Scheme}://{Request.Host}";

            // Get preservation measures
            var preservationMeasures = await _unitOfWork.ScenePreservationMeasureRepository.FindWithIncludeAsync(x => x.InitialResponseId == initialResponse.InitialResponseId, x => x.Attachments);
            dto.PreservationMeasures = preservationMeasures.Select(pm => new InitialResponseDto.ScenePreservationMeasuresDto
            {
                ScenePreservationMeasureId = pm.ScenePreservationMeasureId,
                OfficerUserName = pm.ResponsibleOfficerUserName,
                CaseId = caseId,
                StartTime = pm.StartTime.ToString("yyyy-MM-dd HH:mm:ss"),
                EndTime = pm.EndTime.ToString("yyyy-MM-dd HH:mm:ss"),
                ProtectionMethods = pm.ProtectionMethods,
                AreaCovered = pm.AreaCovered,
                SpecialInstructions = pm.Notes,
                AttachedFilePaths = pm.Attachments?.Select(a => $"{baseUrl}{a.FilePath}").ToList() ?? new List<string>()
            }).ToList();

            // Get medical rescue info
            var medicalSupports = await _unitOfWork.MedicalRescueSupportRepository.FindWithIncludeAsync(x => x.InitialResponseId == initialResponse.InitialResponseId, x => x.Attachments);
            dto.MedicalRescueInfo = medicalSupports.Select(ms => new InitialResponseDto.SceneMedicalRescueInfoDto
            {
                medicalRescueSupportId = ms.MedicalRescueSupportId,
                UnitId = ms.UnitId,
                SupportType = ms.SupportType,
                ArrivalTime = ms.ArrivalTime.ToString(),
                PersonnelAssigned = ms.PersonelAssigned,
                LocationAssigned = ms.LocationAssigned,
                AttachedFilePaths = ms.Attachments?.Select(a => $"{baseUrl}{a.FilePath}").ToList() ?? new List<string>()
            }).ToList();

            return new JsonResult(ApiResponseHelper<InitialResponseDto>.SuccessResult(dto));
        }

        [HttpGet("{caseId}")]
        [HasPermission("Edit_Case")]
        public async Task<ActionResult<CaseDto>> GetCase(string caseId)
        {
            var caseModel = await _unitOfWork.CaseRepository.GetByIdAsync(caseId);
            if (caseModel != null)
            {
                var dto = new CaseDto()
                {
                    CaseId = caseModel.CaseId,
                    TypeCase = caseModel.TypeCase ?? "Unknown",
                    CreateAt = caseModel.CreateAt ?? default(DateTime),
                };
                return new JsonResult(ApiResponseHelper<CaseDto>.SuccessResult(dto));
            }
            return new JsonResult(ApiResponseHelper<string>.NotFoundResult("Case not found."));
        }

        [HttpPost("/api/initial-response")]
        [HasPermission("Edit_Case")]
        public async Task<ActionResult> HandleInitialResponse([FromForm] InitialResponseDto caseInitialResponse)
        {
            await _unitOfWork.BeginTransactionAsync();
            try
            {
                if (!ModelState.IsValid)
                {
                    return new JsonResult(ApiResponseHelper<InitialResponseDto>.FailureResult(
                        "Invalid model state.",
                        ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList(), 400));
                }

                if (string.IsNullOrEmpty(caseInitialResponse.CaseId))
                {
                    return new JsonResult(ApiResponseHelper<InitialResponseDto>.FailureResult("CaseId is required."));
                }

                var caseModel = await _unitOfWork.CaseRepository.GetByIdAsync(caseInitialResponse.CaseId);
                if (caseModel == null)
                {
                    return new JsonResult(ApiResponseHelper<InitialResponseDto>.NotFoundResult("Case not found."));
                }

                // Parse datetime values
                if (!DateTime.TryParse(caseInitialResponse.DispatchTime, out var dispatchTime))
                    dispatchTime = default;
                if (!DateTime.TryParse(caseInitialResponse.ArrivalTime, out var arrivalTime))
                    arrivalTime = default;

                var existingResponse = await _unitOfWork.InitialResponseRepository.GetByCaseIdAsync(caseInitialResponse.CaseId);
                bool isUpdateMode = !string.IsNullOrEmpty(caseInitialResponse.InitialResponseId) || existingResponse != null;

                InitialResponse initialResponse;
                string operationMessage;

                if (isUpdateMode)
                {
                    // UPDATE MODE - Prioritized logic
                    if (existingResponse == null)
                    {
                        return new JsonResult(ApiResponseHelper<InitialResponseDto>.NotFoundResult("Initial response does not exist."));
                    }

                    // Update existing response
                    existingResponse.DispatchTime = dispatchTime;
                    existingResponse.ArrivalTime = arrivalTime;
                    existingResponse.PreliminaryAssessment = caseInitialResponse.SceneAssessment ?? string.Empty;
                    existingResponse.UpdateAt = DateTime.Now;

                    await _unitOfWork.InitialResponseRepository.Update(existingResponse);
                    initialResponse = existingResponse;
                    operationMessage = "Updated successfully.";
                }
                else
                {
                    // CREATE MODE
                    if (existingResponse != null)
                    {
                        return new JsonResult(ApiResponseHelper<InitialResponseDto>.FailureResult("Initial response already exists for this case."));
                    }

                    // Create new response
                    initialResponse = new InitialResponse
                    {
                        InitialResponseId = "IR" + DateTime.Now.ToString("yyyyMMdd_HHmmss_fff"),
                        CaseId = caseInitialResponse.CaseId,
                        DispatchTime = dispatchTime,
                        ArrivalTime = arrivalTime,
                        PreliminaryAssessment = caseInitialResponse.SceneAssessment ?? string.Empty,
                        CreateAt = DateTime.Now,
                        UpdateAt = DateTime.Now,
                        IsDeleted = false
                    };

                    await _unitOfWork.InitialResponseRepository.AddAsync(initialResponse);
                    operationMessage = "Created successfully.";
                }

                // Handle Assigned Officers
                if (caseInitialResponse.AssignedOfficers != null && caseInitialResponse.AssignedOfficers.Any())
                {
                    // Clear existing officer assignments
                    await _unitOfWork.UserCaseRepository.DeleteAllByCaseIdAsync(caseInitialResponse.CaseId);

                    // Validate and add new assignments
                    foreach (var officer in caseInitialResponse.AssignedOfficers)
                    {
                        if (string.IsNullOrEmpty(officer.UserName) || string.IsNullOrEmpty(officer.FullName) ||
                            string.IsNullOrEmpty(officer.Role) || string.IsNullOrEmpty(officer.PhoneNumber))
                        {
                            return new JsonResult(ApiResponseHelper<InitialResponseDto>.FailureResult("All officer fields are required."));
                        }

                        var user = await _unitOfWork.UserRepository.GetByIdAsync(officer.UserName);
                        if (user == null)
                        {
                            return new JsonResult(ApiResponseHelper<InitialResponseDto>.FailureResult($"User {officer.UserName} not found."));
                        }

                        await _unitOfWork.UserCaseRepository.AddAsync(new UserCase
                        {
                            OfficerId = officer.UserName,
                            Responsible = "Unknown",
                            CaseId = caseInitialResponse.CaseId
                        });
                    }
                }

                // Handle Preservation Measures
                if (caseInitialResponse.PreservationMeasures != null && caseInitialResponse.PreservationMeasures.Any())
                {
                    // Clear existing preservation measures
                    await _unitOfWork.ScenePreservationMeasureRepository.DeleteAllByInitialResponseIdAsync(initialResponse.InitialResponseId);

                    var measurePairs = caseInitialResponse.PreservationMeasures
                        .Select((m, index) =>
                        {
                            var id = "SPM" + DateTime.Now.ToString("yyyyMMdd_HHmmss_fff") + "_" + index;
                            var entity = new ScenePreservationMeasure
                            {
                                ScenePreservationMeasureId = id,
                                ResponsibleOfficerUserName = m.OfficerUserName,
                                InitialResponseId = initialResponse.InitialResponseId,
                                StartTime = DateTime.Parse(m.StartTime),
                                EndTime = DateTime.Parse(m.EndTime),
                                AreaCovered = m.AreaCovered,
                                ProtectionMethods = m.ProtectionMethods,
                                Notes = m.SpecialInstructions,
                                CreateAt = DateTime.Now,
                                UpdateAt = DateTime.Now,
                                IsDeleted = false
                            };
                            return new { Dto = m, Entity = entity };
                        })
                        .ToList();

                    await _unitOfWork.ScenePreservationMeasureRepository
                        .AddRangeAsync(measurePairs.Select(p => p.Entity));

                    // Handle attachments for preservation measures
                    var preservationAttachments = new List<ScenePreservationMeasureAttachment>();
                    foreach (var pair in measurePairs)
                    {
                        var dto = pair.Dto;
                        var entity = pair.Entity;

                        if (dto.Files != null && dto.Files.Any())
                        {
                            var validUrls = await SaveFileAsync(
                                "files", dto.Files, "measure", entity.ScenePreservationMeasureId
                            );
                            if (validUrls != null && validUrls.Any())
                            {
                                foreach (var url in validUrls)
                                {
                                    preservationAttachments.Add(new ScenePreservationMeasureAttachment
                                    {
                                        ScenePreservationMeasureAttachmentId = "SPMA" + DateTime.Now.ToString("yyyyMMdd_HHmmss_fff"),
                                        FilePath = url,
                                        ScenePreservationMeasureId = entity.ScenePreservationMeasureId
                                    });
                                }
                            }
                        }
                    }

                    if (preservationAttachments.Any())
                    {
                        await _unitOfWork.ScenePreservationMeasureAttachmentRepository
                            .AddRangeAsync(preservationAttachments);
                    }
                }

                // Handle Medical Rescue Info
                if (caseInitialResponse.MedicalRescueInfo != null && caseInitialResponse.MedicalRescueInfo.Any())
                {
                    // Clear existing medical rescue support
                    await _unitOfWork.MedicalRescueSupportRepository
                        .DeleteAllByInitialResponseIdAsync(initialResponse.InitialResponseId);

                    var supportPairs = caseInitialResponse.MedicalRescueInfo
                        .Select((r, index) =>
                        {
                            var id = "MRS" + DateTime.Now.ToString("yyyyMMdd_HHmmss_fff") + "_" + index;
                            var entity = new MedicalRescueSupport
                            {
                                MedicalRescueSupportId = id,
                                InitialResponseId = initialResponse.InitialResponseId,
                                UnitId = r.UnitId,
                                SupportType = r.SupportType,
                                PersonelAssigned = r.PersonnelAssigned,
                                LocationAssigned = r.LocationAssigned,
                                CreateAt = DateTime.Now,
                                UpdateAt = DateTime.Now,
                                IsDeleted = false
                            };
                            return new { Dto = r, Entity = entity };
                        })
                        .ToList();

                    await _unitOfWork.MedicalRescueSupportRepository
                        .AddRangeAsync(supportPairs.Select(p => p.Entity));

                    // Handle attachments for medical rescue
                    var medicalAttachments = new List<MedicalRescueSupportAttachment>();
                    foreach (var pair in supportPairs)
                    {
                        var dto = pair.Dto;
                        var entity = pair.Entity;

                        if (dto.Files != null && dto.Files.Any())
                        {
                            var urls = await SaveFileAsync("files", dto.Files, "rescue", entity.MedicalRescueSupportId);
                            if (urls != null && urls.Any())
                            {
                                foreach (var url in urls)
                                {
                                    medicalAttachments.Add(new MedicalRescueSupportAttachment
                                    {
                                        MedicalRescueSupportAttachmentId = "MRSA" + DateTime.Now.ToString("yyyyMMdd_HHmmss_fff"),
                                        MedicalRescueSupportId = entity.MedicalRescueSupportId,
                                        FilePath = url
                                    });
                                }
                            }
                        }
                    }

                    if (medicalAttachments.Any())
                    {
                        await _unitOfWork.MedicalRescueSupportAttachmentRepository
                            .AddRangeAsync(medicalAttachments);
                    }
                }

                await _unitOfWork.SaveChangesAsync();
                await _unitOfWork.CommitAsync();

                return new JsonResult(ApiResponseHelper<InitialResponseDto>.SuccessResult(null, operationMessage));
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackAsync();
                return new JsonResult(ApiResponseHelper<InitialResponseDto>.FailureResult(
                    "An error occurred while processing your request.",
                    new List<string> { ex.Message }, 500));
            }
        }


        #region Private Methods

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

            // Delete existing files for this id in the saveDir
            var searchPattern = $"{prefix}_{id}_*";
            var existingFiles = Directory.GetFiles(saveDir, searchPattern + ".*");
            foreach (var filePath in existingFiles)
            {
                try
                {
                    System.IO.File.Delete(filePath);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error deleting file {filePath}: {ex.Message}");
                }
            }

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
        #endregion
    }
}
