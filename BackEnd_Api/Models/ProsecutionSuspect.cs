using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class ProsecutionSuspect : ISoftDeletable
    {
        public string ProsecutionId { get; set; }
        public Prosecution Prosecution { get; set; }
        public string SuspectId { get; set; }
        public Suspect Suspect { get; set; }
        public bool IsDeleted { get; set; }
    }
}
