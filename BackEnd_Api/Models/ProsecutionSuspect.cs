namespace BackEnd_Api.Models
{
    public class ProsecutionSuspect
    {
        public int ProsecutionId { get; set; }
        public Prosecution Prosecution { get; set; }
        public int SuspectId { get; set; }
        public Suspect Suspect { get; set; }
        public bool IsDeleted { get; set; }
    }
}
