namespace BackEnd_Api.Models
{
    public class Case
    {
        public int CaseId { get; set; }
        public string CaseNumber { get; set; }
        public string TypeCase { get; set; }
        public string Severity { get; set; }
        public string Status { get; set; }
        public string Summary { get; set; }
        public DateTime CreateAt { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<UserCase> UserCases { get; set; }
        public ICollection<Victim> Victims { get; set; }
        public ICollection<Suspect> Suspects { get; set; }
        public ICollection<Witness> Witnesses { get; set; }
        public ICollection<Warrant> Warrants { get; set; }
        public ICollection<CaseEvidence> CaseEvidences { get; set; }
        public ICollection<Report> Reports { get; set; }
        public ICollection<InvestigationPlan> InvestigationPlans { get; set; }
        public ICollection<CaseResult> CaseResults { get; set; }
        public ICollection<Event> Events { get; set; }
        public ICollection<Sentence> Sentences { get; set; }
        public ICollection<Prosecution> Prosecutions { get; set; }
        public ICollection<Arrest> Arrests { get; set; }
    }
}
