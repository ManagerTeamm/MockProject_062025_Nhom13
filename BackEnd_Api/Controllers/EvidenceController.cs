using BackEnd_Api.Dtos;
using BackEnd_Api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvidenceController : ControllerBase
    {
        private readonly IEvidenceRepository _evidenceRepository;

        public EvidenceController(IEvidenceRepository evidenceRepository)
        {
            _evidenceRepository = evidenceRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EvidenceDto>>> GetEvidences()
        {
            var evidences = await _evidenceRepository.GetAllEvidencesAsync();
            return Ok(evidences);
        }

        [HttpPost]
        public async Task<ActionResult<EvidenceDto>> CreateEvidence([FromBody] CreateEvidenceDto dto)
        {
            var created = await _evidenceRepository.CreateEvidenceAsync(dto);
            return CreatedAtAction(nameof(GetEvidences), new { id = created.EvidenceId }, created);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EvidenceDto>> GetEvidenceById(string id)
        {
            var evidence = await _evidenceRepository.GetEvidenceByIdAsync(id);
            if (evidence == null) return NotFound();
            return Ok(evidence);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EvidenceDto>> UpdateEvidence(string id, [FromBody] CreateEvidenceDto dto)
        {
            var updated = await _evidenceRepository.UpdateEvidenceAsync(id, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpGet("paginated")]
        public async Task<ActionResult<object>> GetEvidencesPaginated([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _evidenceRepository.GetEvidencesPaginatedAsync(page, pageSize);
            return Ok(result);
        }

        [HttpGet("filter")]
        public async Task<ActionResult<object>> FilterEvidences([FromQuery] string? status = null, 
            [FromQuery] DateTime? collectedAt = null,
            [FromQuery] int page = 1, 
            [FromQuery] int pageSize = 10)
        {
            var filterDto = new EvidenceFilterDto
            {
                Status = status,
                CollectedAt = collectedAt,
                Page = page,
                PageSize = pageSize
            };

            var result = await _evidenceRepository.FilterEvidencesAsync(filterDto);
            return Ok(result);
        }
    }
}
