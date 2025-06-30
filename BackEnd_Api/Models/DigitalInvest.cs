namespace BackEnd_Api.Models
{
    public class DigitalInvest
    {
        public int EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public string DeviceType { get; set; }
        public string AnalystTool { get; set; }
        public string Result { get; set; }
        public bool IsDeleted { get; set; }
    }
}
