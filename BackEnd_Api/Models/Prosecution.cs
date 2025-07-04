namespace BackEnd_Api.Models
{
    public class Prosecution
    {
        public string ProsecutionId { get; set; }
        public string CaseId { get; set; }
        public Case Case { get; set; }
        public string ProsecutorId { get; set; }
        public User Prosecutor { get; set; }
        public string? Decision { get; set; }
        public DateTime? DecisionDate { get; set; }
        public string? Reason { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<Indictment> Indictments { get; set; }
        public ICollection<ProsecutionSuspect> ProsecutionSuspects { get; set; }
    }
}
