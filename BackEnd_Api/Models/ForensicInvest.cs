namespace BackEnd_Api.Models
{
    public class ForensicInvest
    {
        public int EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public string LabName { get; set; }
        public string Report { get; set; }
        public string ResultSummary { get; set; }
        public DateTime ReceivedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
