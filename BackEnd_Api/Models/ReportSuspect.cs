namespace BackEnd_Api.Models
{
    public class ReportSuspect
    {
        public int ReportId { get; set; }
        public Report Report { get; set; }
        public int SuspectId { get; set; }
        public Suspect Suspect { get; set; }
        public bool IsDeleted { get; set; }
    }
}
