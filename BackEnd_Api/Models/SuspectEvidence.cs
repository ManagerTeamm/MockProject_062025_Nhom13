namespace BackEnd_Api.Models
{
    public class SuspectEvidence
    {
        public int SuspectId { get; set; }
        public Suspect Suspect { get; set; }
        public int EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public bool IsDeleted { get; set; }
    }
}
