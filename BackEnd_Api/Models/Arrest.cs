namespace BackEnd_Api.Models
{
    public class Arrest
    {
        public string SuspectId { get; set; }
        public Suspect Suspect { get; set; }
        public string CaseId { get; set; }
        public Case Case { get; set; }
        public string OfficerId { get; set; }
        public User User { get; set; }
        public string SuspectMirandaSignature { get; set; }
        public DateTime ArrestStartTime { get; set; }
        public DateTime? ArrestEndTime { get; set; }
        public bool IsDeleted { get; set; }
    }
}
