namespace BackEnd_Api.Models
{
    public class ReportVictim
    {
        public string ReportId { get; set; }
        public Report Report { get; set; }
        public string VictimId { get; set; }
        public Victim Victim { get; set; }
        public bool IsDeleted { get; set; }
    }
}
