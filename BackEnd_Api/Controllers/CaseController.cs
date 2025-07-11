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
        private readonly ICaseRepository _caseRepository;
        private readonly IUserRepository _userRepository;
        private readonly ISceneProtectionRepository _sceneProtectionRepository;
        private readonly ISceneSupportRepository _sceneSupportRepository;
        private readonly IWebHostEnvironment _env;

        public CaseController(ICaseRepository caseRepository, IUserRepository userRepository, ISceneProtectionRepository sceneProtectionRepository, ISceneSupportRepository sceneSupportRepository, IWebHostEnvironment env)
        {
            _caseRepository = caseRepository;
            _userRepository = userRepository;
            _sceneProtectionRepository = sceneProtectionRepository;
            _sceneSupportRepository = sceneSupportRepository;
            _env = env;
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
            var result = await _caseRepository.GetCasesAsync(filter);
            return Ok(result);
        }

        //Tạo mới trường hợp bảo vệ hiện trường
        [Authorize]
        [HttpPost("create-protection")]
        public IActionResult CreateProtectionCase([FromBody] SceneProtection sceneProtection)
        {
            var userPermissions = _userRepository.GetPermissions();
            if (!userPermissions.Contains("Edit_Case"))
                return Forbid("You do not have permission to delete users.");

            var res = _caseRepository.CreateProtection(sceneProtection);

            return Ok(ApiResponseHelper<SceneProtection>.SuccessResult(null, "Protection scene successfully"));
        }

        [HttpGet("{caseId}")]
        [HasPermission("Edit_Case")]
        public async Task<ActionResult<CaseDto>> GetCase(string caseId)
        {
            var caseModel = await _caseRepository.GetByIdAsync(caseId);
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

        [HttpGet("/api/initial-response/{caseId}")]
        [HasPermission("Edit_Case")]
        public async Task<ActionResult<InitialResponseDto>> GetInitialResponse(string caseId)
        {
            var protections = await _sceneProtectionRepository.GetSceneProtectionsByCaseIdAsync(caseId);
            var supports = await _sceneSupportRepository.GetSceneSupportsByCaseIdAsync(caseId);
            var initialResponse = new InitialResponseDto()
            {
                CaseId = caseId,
                DispatchTime = "",
                SceneAssessment = "",
            };

            if (protections == null && supports == null)
            {
                return new JsonResult(ApiResponseHelper<string>.NotFoundResult("Not found."));
            }
            else
            {
                if(protections.Count > 0)
                {
                    initialResponse.PreservationMeasures = protections.Select(x => new SceneProtectionDto
                    {
                        SceneProtectionId = x.SceneProtectionId,
                        //Description = x.Description,
                    }).ToList();
                }
                
                if(supports.Count > 0)
                {
                    initialResponse.MedicalRescueInfo = supports.Select(x => new SceneSupportDto
                    {
                        SceneSupportId = x.SceneSuportId,
                        LocationAssigned = x.LocationAssigned,
                    }).ToList();
                }
                return new JsonResult(ApiResponseHelper<InitialResponseDto>.SuccessResult(initialResponse, "Initial response retrieved successfully."));
            }
        }

        [HttpPost("/api/initial-response")]
        [HasPermission("Edit_Case")]
        public async Task<ActionResult> PostInitialResponse([FromForm] InitialResponseDto caseInitialResponse)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(ApiResponseHelper<InitialResponseDto>.FailureResult("Invalid model state.", ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)).ToList(), 400));
            }

            if (string.IsNullOrEmpty(caseInitialResponse.CaseId))
            {
                return new JsonResult(ApiResponseHelper<InitialResponseDto>.FailureResult("CaseId is required."));
            }

            var caseModel = await _caseRepository.GetByIdAsync(caseInitialResponse.CaseId);
            if (caseModel == null)
            {
                return new JsonResult(ApiResponseHelper<InitialResponseDto>.NotFoundResult("Case not found."));
            }

            // Cập nhật Summary với logic cải tiến
            await UpdateCaseSummary(caseModel, caseInitialResponse);

            // Cập nhật Case
            await _caseRepository.Update(caseModel);

            // Xử lý Preservation Measures
            if (caseInitialResponse.PreservationMeasures != null && caseInitialResponse.PreservationMeasures.Any())
            {
                await ProcessPreservationMeasures(caseInitialResponse.CaseId, caseInitialResponse.PreservationMeasures);
            }

            // Xử lý Medical Rescue Info
            if (caseInitialResponse.MedicalRescueInfo != null && caseInitialResponse.MedicalRescueInfo.Any())
            {
                await ProcessMedicalRescueInfo(caseInitialResponse.CaseId, caseInitialResponse.MedicalRescueInfo);
            }

            return new JsonResult(ApiResponseHelper<InitialResponseDto>.SuccessResult(null, "Successfully."));
        }

        private async Task UpdateCaseSummary(Case caseModel, InitialResponseDto caseInitialResponse)
        {
            var summaryLines = (caseModel.Summary ?? string.Empty).Split('\n', StringSplitOptions.RemoveEmptyEntries).ToList();

            // Sử dụng helper method để update summary lines
            UpdateSummaryLine(summaryLines, "Dispatch time: ", caseInitialResponse.DispatchTime);
            UpdateSummaryLine(summaryLines, "Arrival time: ", caseInitialResponse.ArrivalTime);
            UpdateSummaryLine(summaryLines, "Scene Assessment: ", caseInitialResponse.SceneAssessment);

            caseModel.Summary = summaryLines.Any() ? string.Join('\n', summaryLines) + "\n" : "";
        }

        private void UpdateSummaryLine(List<string> summaryLines, string prefix, string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                summaryLines.RemoveAll(line => line.StartsWith(prefix));
                summaryLines.Add(prefix + value);
            }
        }

        private async Task ProcessPreservationMeasures(string caseId, IEnumerable<InitialResponseDto.SceneProtectionDto> preservationMeasures)
        {
            var existingProtections = await _sceneProtectionRepository.GetSceneProtectionsByCaseIdAsync(caseId);

            foreach (var protection in preservationMeasures)
            {
                if (string.IsNullOrEmpty(protection.SceneProtectionId))
                {
                    await CreateNewSceneProtection(caseId, protection);
                }
                else
                {
                    await UpdateExistingSceneProtection(existingProtections, protection);
                }
            }
        }

        private async Task CreateNewSceneProtection(string caseId, InitialResponseDto.SceneProtectionDto protection)
        {
            var newProtection = new SceneProtection
            {
                SceneProtectionId = "SCENE_PROTECTION_" + DateTime.Now.ToString("yyyyMMdd_HHmmss_fff"),
                CaseId = caseId,
                TimeStart = DateTime.Parse(protection.StartTime),
                TimeEnd = DateTime.Parse(protection.EndTime),
                LocationCover = protection.AreaCovered,
                IsDeleted = false
            };

            // Xây dựng Description
            newProtection.Description = await BuildProtectionDescription(protection);

            // Xử lý files
            if (protection.Files != null && protection.Files.Any())
            {
                var filePaths = await SaveFileAsync("files", protection.Files, "preservation_measures", newProtection.SceneProtectionId);
                newProtection.AttachedFiles = string.Join(",", filePaths);
            }

            await _sceneProtectionRepository.AddAsync(newProtection);
        }

        private async Task UpdateExistingSceneProtection(IEnumerable<SceneProtection> existingProtections, InitialResponseDto.SceneProtectionDto protection)
        {
            var existingProtection = existingProtections.FirstOrDefault(x => x.SceneProtectionId == protection.SceneProtectionId);
            if (existingProtection != null)
            {
                existingProtection.TimeStart = DateTime.Parse(protection.StartTime);
                existingProtection.TimeEnd = DateTime.Parse(protection.EndTime);
                existingProtection.LocationCover = protection.AreaCovered;

                // Xây dựng lại Description
                existingProtection.Description = await BuildProtectionDescription(protection);

                // Xử lý files
                if (protection.Files != null && protection.Files.Any())
                {
                    var filePaths = await SaveFileAsync("files", protection.Files, "preservation_measures", existingProtection.SceneProtectionId);
                    existingProtection.AttachedFiles = string.Join(",", filePaths);
                }

                await _sceneProtectionRepository.Update(existingProtection);
            }
        }

        private async Task<string> BuildProtectionDescription(InitialResponseDto.SceneProtectionDto protection)
        {
            var descriptionParts = new List<string>();

            if (!string.IsNullOrEmpty(protection.ProtectionMethods))
            {
                descriptionParts.Add($"Protection method: {protection.ProtectionMethods}");
            }

            if (!string.IsNullOrEmpty(protection.OfficerUserName))
            {
                var officer = await _userRepository.GetByIdAsync(protection.OfficerUserName);
                if (officer != null)
                {
                    descriptionParts.Add($"Assigned officer: {officer.FullName} ({officer.UserName})");
                }
            }

            if (!string.IsNullOrEmpty(protection.SpecialInstructions))
            {
                descriptionParts.Add($"Special instructions: {protection.SpecialInstructions}");
            }

            return string.Join('\n', descriptionParts) + (descriptionParts.Any() ? "\n" : "");
        }

        private async Task ProcessMedicalRescueInfo(string caseId, IEnumerable<InitialResponseDto.SceneSupportDto> medicalRescueInfo)
        {
            var existingSupports = await _sceneSupportRepository.GetSceneSupportsByCaseIdAsync(caseId);

            foreach (var support in medicalRescueInfo)
            {
                if (string.IsNullOrEmpty(support.SceneSupportId))
                {
                    await CreateNewSceneSupport(caseId, support);
                }
                else
                {
                    await UpdateExistingSceneSupport(existingSupports, support);
                }
            }
        }

        private async Task CreateNewSceneSupport(string caseId, InitialResponseDto.SceneSupportDto support)
        {
            var newSupport = new SceneSuport
            {
                SceneSuportId = "SCENE_SUPPORT_" + DateTime.Now.ToString("yyyyMMdd_HHmmss_fff"),
                CaseId = caseId,
                LocationAssigned = support.LocationAssigned,
                TypeSuport = support.SupportType ?? "Unknown",
                IsDeleted = false
            };

            // Xử lý files
            if (support.Files != null && support.Files.Any())
            {
                var filePaths = await SaveFileAsync("files", support.Files, "medical_rescue", newSupport.SceneSuportId);
                newSupport.AttachedFiles = string.Join(",", filePaths);
            }

            await _sceneSupportRepository.AddAsync(newSupport);
        }

        private async Task UpdateExistingSceneSupport(IEnumerable<SceneSuport> existingSupports, InitialResponseDto.SceneSupportDto support)
        {
            var existingSupport = existingSupports.FirstOrDefault(x => x.SceneSuportId == support.SceneSupportId);
            if (existingSupport != null)
            {
                existingSupport.LocationAssigned = support.LocationAssigned;
                existingSupport.TypeSuport = support.SupportType ?? "Unknown";

                // Xử lý files
                if (support.Files != null && support.Files.Any())
                {
                    var filePaths = await SaveFileAsync("files", support.Files, "medical_rescue", existingSupport.SceneSuportId);
                    existingSupport.AttachedFiles = string.Join(",", filePaths);
                }

                await _sceneSupportRepository.Update(existingSupport);
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
    }
}
