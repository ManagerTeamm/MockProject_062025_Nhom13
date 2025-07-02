namespace BackEnd_Api.Models
{
    public class ReportSuspect
    {
        public string ReportId { get; set; }
        public Report Report { get; set; }
        public string SuspectId { get; set; }
        public Suspect Suspect { get; set; }
        public bool IsDeleted { get; set; }
    }
}
