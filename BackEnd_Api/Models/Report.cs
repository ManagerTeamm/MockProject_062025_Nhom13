namespace BackEnd_Api.Models
{
    public class Report
    {
        public string ReportId { get; set; }
        public string? CaseId { get; set; }
        public Case Case { get; set; }
        public string TypeReport { get; set; }
        public string Severity { get; set; }
        public string? Description { get; set; }
        public string CaseLocation { get; set; }
        public DateTime? ReportedAt { get; set; }
        public string ReporterFullname { get; set; }
        public string ReporterEmail { get; set; }
        public string ReporterPhoneNumber { get; set; }
        public string? RelationshipToIncident { get; set; }
        public DateTime? TimeOfOccurrence { get; set; }
        public string? AddressReported { get; set; }
        public string? OfficerApproveId { get; set; }
        public User User { get; set; }
        public bool IsDeleted { get; set; } = false;
        public ICollection<ReportVictim> ReportVictims { get; set; }
        public ICollection<ReportSuspect> ReportSuspects { get; set; }
        public ICollection<ReportWitness> ReportWitness { get; set; }
        public ICollection<Evidence> Evidences { get; set; }
    }
}
