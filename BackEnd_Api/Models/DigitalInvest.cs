namespace BackEnd_Api.Models
{
    public class DigitalInvest
    {
        public string EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public string DeviceType { get; set; }
        public string? AnalystTool { get; set; }
        public string? AttachedFiles { get; set; }
        public bool IsDeleted { get; set; }
    }
}
