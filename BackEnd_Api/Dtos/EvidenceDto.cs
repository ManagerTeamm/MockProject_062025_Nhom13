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
        public CaseInfoDto CaseInfo { get; set; }
        public SuspectInfoDto SuspectInfo { get; set; }
    }
    public class CreateEvidenceDto
    {
        public string EvidenceId { get; set; }
        public string CaseId { get; set; }
        public string Description { get; set; }
        public DateTime CollectedAt { get; set; }
        public string CollectedBy { get; set; }
        public string TypeEvidence { get; set; }
        public string CurrentLocation { get; set; }
        public string AttachedFile { get; set; }
        public string Status { get; set; }
    }
    public class CaseInfoDto
    {
        public string CaseId { get; set; }
        public string Type { get; set; }
        public string Severity { get; set; }
        public string Status { get; set; }
        public string Summary { get; set; }
    }
    public class SuspectInfoDto
    {
        public string SuspectId { get; set; }
        public string FullName { get; set; }
        public string Status { get; set; }
    }
}
