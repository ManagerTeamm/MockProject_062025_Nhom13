using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BackEnd_Api.Repositories.Interfaces;
using BackEnd_Api.Dtos;
using BackEnd_Api.Models;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuspectController : ControllerBase
    {
        private readonly ISuspectRepository _suspectRepository;
        public SuspectController(ISuspectRepository suspectRepository)
        {
            _suspectRepository = suspectRepository;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetListSuspect()
        {
            var suspects = await _suspectRepository.GetAllSuspectsAsync();
            if (suspects == null || !suspects.Any())
                return NotFound("No suspects found.");

            var result = suspects.Select(s => new SuspectDto
            {
                CaseId = s.CaseId,
                SuspectId = s.SuspectId,
                Fullname = s.Fullname,
                Address = s.Address,
                Description = s.Description,
                Status = s.Status,
                CatchTime = s.CatchTime
            }).ToList();

            return Ok(result);
        }

        [HttpGet("paginated")]
        public async Task<IActionResult> GetSuspectsPaginated([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var (suspects, totalCount) = await _suspectRepository.GetSuspectsPaginatedAsync(page, pageSize);
            var result = suspects.Select(s => new SuspectDto
            {
                CaseId = s.CaseId,
                SuspectId = s.SuspectId,
                Fullname = s.Fullname,
                Address = s.Address,
                Description = s.Description,
                Status = s.Status,
                CatchTime = s.CatchTime
            }).ToList();
            return Ok(new { data = result, totalCount });
        }

        [HttpGet("filter")]
        public async Task<IActionResult> FilterSuspects([FromQuery] string? status, [FromQuery] DateTime? catchTime, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var (suspects, totalCount) = await _suspectRepository.FilterSuspectsAsync(status, catchTime, page, pageSize);
            var result = suspects.Select(s => new SuspectDto
            {
                CaseId = s.CaseId,
                SuspectId = s.SuspectId,
                Fullname = s.Fullname,
                Address = s.Address,
                Description = s.Description,
                Status = s.Status,
                CatchTime = s.CatchTime
            }).ToList();
            return Ok(new { data = result, totalCount });
        }
    }
} 