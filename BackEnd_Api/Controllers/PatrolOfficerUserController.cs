// Controllers/PatrolOfficerUserController.cs
using Microsoft.AspNetCore.Mvc;
using BackEnd_Api.Dtos; // Giữ nguyên dòng này
// Bỏ dòng using static BackEnd_Api.Dtos.PatrolOfficerDto;
using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatrolOfficerUserController : ControllerBase
    {
        private readonly IPatrolOfficerRepository _patrolOfficerRepository;

        public PatrolOfficerUserController(IPatrolOfficerRepository patrolOfficerRepository)
        {
            _patrolOfficerRepository = patrolOfficerRepository;
        }

        [HttpGet]
      
        public async Task<ActionResult<PatrolOfficerDto.PaginatedResult<PatrolOfficerDto>>> GetPatrolOfficers(
            [FromQuery] string? searchQuery,
            [FromQuery] string? presentStatus,
            [FromQuery] string? zone,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var paginatedResult = await _patrolOfficerRepository.GetPaginatedPatrolOfficersAsync(
                searchQuery, presentStatus, zone, pageNumber, pageSize);

            if (paginatedResult == null || !paginatedResult.Items.Any())
            {
                return NotFound("No patrol officers found matching criteria.");
            }

            return Ok(paginatedResult);
        }
    }
}