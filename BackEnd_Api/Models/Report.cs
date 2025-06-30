namespace BackEnd_Api.Models
{
    public class Report
    {
        public int ReportId { get; set; }
        public int CaseId { get; set; }
        public Case Case { get; set; }
        public string TypeReport { get; set; }
        public string Description { get; set; }
        public string CaseLocation { get; set; }
        public DateTime ReportedAt { get; set; }
        public string ReporterFullname { get; set; }
        public string ReporterEmail { get; set; }
        public string ReporterPhonenumber { get; set; }
        public string OfficerApproveId { get; set; }
        public ApplicationUser OfficerApprove { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<ReportVictim> ReportVictims { get; set; }
        public ICollection<ReportSuspect> ReportSuspects { get; set; }
    }
}
