namespace BackEnd_Api.Models
{
    public class Prosecution
    {
        public int ProsecutionId { get; set; }
        public int CaseId { get; set; }
        public Case Case { get; set; }
        public string ProsecutorId { get; set; }
        public ApplicationUser Prosecutor { get; set; }
        public string Decision { get; set; }
        public DateTime? DecisionDate { get; set; }
        public string Reason { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<Indictment> Indictments { get; set; }
        public ICollection<ProsecutionSuspect> ProsecutionSuspects { get; set; }
    }
}
