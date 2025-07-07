using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class DigitalInvest : ISoftDeletable
    {
        public string EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public string DeviceType { get; set; }
        public string? AnalystTool { get; set; }
        public string? AttachedFiles { get; set; }
        public bool IsDeleted { get; set; }
    }
}
