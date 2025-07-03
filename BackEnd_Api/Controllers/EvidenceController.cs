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

        //getbyid
        [HttpGet("{id}")]
        public async Task<ActionResult<EvidenceDto>> GetEvidenceById(string id)
        {
            var evidence = await _evidenceRepository.GetEvidenceByIdAsync(id);
            if (evidence == null)
            {
                return NotFound();
            }
            return Ok(evidence);
        }

        [HttpPost]
        public async Task<ActionResult<EvidenceDto>> CreateEvidence(CreateEvidenceDto createEvidenceDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var evidence = await _evidenceRepository.CreateEvidenceAsync(createEvidenceDto);
            return CreatedAtAction(nameof(GetEvidences), new { id = evidence.EvidenceId }, evidence);
        }
    }
}
