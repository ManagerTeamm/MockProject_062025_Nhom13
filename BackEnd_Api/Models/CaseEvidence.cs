namespace BackEnd_Api.Models
{
    public class CaseEvidence
    {
        public int CaseId { get; set; }
        public Case Case { get; set; }
        public int EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public bool IsDeleted { get; set; }
    }
}
