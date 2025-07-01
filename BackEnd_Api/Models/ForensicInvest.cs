namespace BackEnd_Api.Models
{
    public class ForensicInvest
    {
        public string EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public string LabName { get; set; }
        public string ReportFiles { get; set; }
        public string ResultSummary { get; set; }
        public DateTime ReceivedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
