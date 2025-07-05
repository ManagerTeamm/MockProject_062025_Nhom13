namespace BackEnd_Api.Dtos.ReportDtos
{
    public class ReportEvidenceDto
    {
        public string TypeOfEvidence { get; set; }
        public string? EvidenceLocation { get; set; }
        public string? Description { get; set; }
        public List<IFormFile>? Attachments { get; set; }
    }
}
