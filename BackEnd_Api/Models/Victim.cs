namespace BackEnd_Api.Models
{
    public class Victim
    {
        public int VictimId { get; set; }
        public int CaseId { get; set; }
        public Case Case { get; set; }
        public string Fullname { get; set; }
        public string Contact { get; set; }
        public string Injuries { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<VictimInterview> VictimInterviews { get; set; }
        public ICollection<ReportVictim> ReportVictims { get; set; }
    }
}
