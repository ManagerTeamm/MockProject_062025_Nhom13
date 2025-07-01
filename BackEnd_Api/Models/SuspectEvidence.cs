namespace BackEnd_Api.Models
{
    public class SuspectEvidence
    {
        public string SuspectId { get; set; }
        public Suspect Suspect { get; set; }
        public string EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public bool IsDeleted { get; set; }
    }
}
