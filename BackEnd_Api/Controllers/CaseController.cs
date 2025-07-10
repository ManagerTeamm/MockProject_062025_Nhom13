using BackEnd_Api.Dtos;
using BackEnd_Api.Helpers;
using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaseController : ControllerBase
    {
        private readonly ICaseRepository _caseRepository;
        private readonly IUserRepository _userRepository;

        public CaseController(ICaseRepository caseRepository, IUserRepository userRepository)
        {
            _caseRepository = caseRepository;
            _userRepository = userRepository;
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
    }
}
