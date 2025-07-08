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

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<EvidenceDto>>> SearchEvidence([FromQuery] DateTime? from, [FromQuery] string status)
        {
            if (from.HasValue && string.IsNullOrEmpty(status))
            {
                var date = from.Value.Date;
                var nextDate = date.AddDays(1);
                var result = await _evidenceRepository.SearchEvidenceAsync(date, nextDate.AddTicks(-1), null);
                return Ok(result);
            }
            if (!from.HasValue && !string.IsNullOrEmpty(status))
            {
                var result = await _evidenceRepository.SearchEvidenceAsync(null, null, status);
                return Ok(result);
            }
            if (from.HasValue && !string.IsNullOrEmpty(status))
            {
                var date = from.Value.Date;
                var nextDate = date.AddDays(1);
                var result = await _evidenceRepository.SearchEvidenceAsync(date, nextDate.AddTicks(-1), status);
                return Ok(result);
            }
            var all = await _evidenceRepository.GetAllEvidencesAsync();
            return Ok(all);
        }

        [HttpGet("paginated")]
        public async Task<ActionResult<object>> GetEvidencesPaginated([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _evidenceRepository.GetEvidencesPaginatedAsync(page, pageSize);
            return Ok(result);
        }
    }
}
