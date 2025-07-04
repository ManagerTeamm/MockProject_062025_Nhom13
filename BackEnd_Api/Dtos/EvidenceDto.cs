namespace BackEnd_Api.Dtos
{
    public class EvidenceDto
    {
        public string EvidenceId { get; set; }
        public string CaseId { get; set; }
        public string Description { get; set; }
        public DateTime CollectedAt { get; set; }
        public string Collector { get; set; }
        public string Status { get; set; }
    }
    public class CreateEvidenceDto
    {
        public string CaseId { get; set; }
        public string Description { get; set; }
        public DateTime CollectedAt { get; set; }
        public string CollectedBy { get; set; }
        public string TypeEvidence { get; set; }
        public string CurrentLocation { get; set; }
        public string AttachedFile { get; set; }
        public string Status { get; set; }
    }
}
