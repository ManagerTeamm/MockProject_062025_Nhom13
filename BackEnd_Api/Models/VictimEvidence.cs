namespace BackEnd_Api.Models
{
    public class VictimEvidence
    {
        public string VictimId { get; set; }
        public Victim Victim { get; set; }
        public string EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public bool IsDeleted { get; set; }
    }
}
