namespace BackEnd_Api.Models
{
    public class Suspect
    {
        public string SuspectId { get; set; }
        public string? CaseId { get; set; }
        public Case? Case { get; set; }
        public string? Fullname { get; set; }
        public string? National { get; set; }
        public string? Gender { get; set; }
        public DateTime? Dob { get; set; }
        public string? Identification { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Description { get; set; }
        public string? Address { get; set; }
        public DateTime? CatchTime { get; set; }
        public string? Notes { get; set; }
        public string? Status { get; set; }
        public string? MugshotUrl { get; set; }
        public string? FingerPrintsHash { get; set; }
        public string? HealthStatus { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<ReportSuspect> ReportSuspects { get; set; }
        public ICollection<ProsecutionSuspect> ProsecutionSuspects { get; set; }
        public ICollection<SuspectEvidence> SuspectEvidences { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Arrest> Arrests { get; set; }
    }
}
