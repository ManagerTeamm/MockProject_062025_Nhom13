using BackEnd_Api.Dtos;
using BackEnd_Api.Repositories.Interfaces; // QUAN TRỌNG: Inject ICaseRepository
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CasesController : ControllerBase
    {
        private readonly ICaseRepository _caseRepository; // <-- Đây là Repository

        // Constructor để Dependency Injection cung cấp một instance của ICaseRepository
        public CasesController(ICaseRepository caseRepository)
        {
            _caseRepository = caseRepository;
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
    }
}