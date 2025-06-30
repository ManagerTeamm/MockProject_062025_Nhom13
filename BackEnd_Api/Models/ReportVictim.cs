namespace BackEnd_Api.Models
{
    public class ReportVictim
    {
        public int ReportId { get; set; }
        public Report Report { get; set; }
        public int VictimId { get; set; }
        public Victim Victim { get; set; }
        public bool IsDeleted { get; set; }
    }
}
