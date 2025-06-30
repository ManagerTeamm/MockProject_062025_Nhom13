namespace BackEnd_Api.Models
{
    public class WarrantEvidence
    {
        public int WarrantId { get; set; }
        public Warrant Warrant { get; set; }
        public int EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public bool IsDeleted { get; set; }
    }
}
