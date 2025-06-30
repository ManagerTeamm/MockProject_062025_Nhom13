namespace BackEnd_Api.Models
{
    public class Arrest
    {
        public int SuspectId { get; set; }
        public Suspect Suspect { get; set; }
        public int CaseId { get; set; }
        public Case Case { get; set; }
        public string OfficerId { get; set; }
        public ApplicationUser Officer { get; set; }
        public string SuspectMirandaSignature { get; set; }
        public DateTime ArrestStartTime { get; set; }
        public DateTime? ArrestEndTime { get; set; }
        public bool IsDeleted { get; set; }
    }
}
