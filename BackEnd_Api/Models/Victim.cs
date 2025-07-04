namespace BackEnd_Api.Models
{
    public class Victim
    {
        public string VictimId { get; set; }
        public string CaseId { get; set; }
        public Case Case { get; set; }
        public string? Fullname { get; set; }
        public string? National { get; set; }
        public string Gender { get; set; }
        public string? Description { get; set; }
        public string? Contact { get; set; }
        public string? Injuries { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<ReportVictim> ReportVictims { get; set; }
        public ICollection<VictimEvidence> VictimEvidences { get; set; }
    }
}
