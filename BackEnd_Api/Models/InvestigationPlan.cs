namespace BackEnd_Api.Models
{
    public class InvestigationPlan
    {
        public int InvestigationPlanId { get; set; }
        public string CreatedOfficerId { get; set; }
        public ApplicationUser CreatedOfficer { get; set; }
        public int CaseId { get; set; }
        public Case Case { get; set; }
        public DateTime DeadlineDate { get; set; }
        public string Result { get; set; }
        public string Status { get; set; }
        public DateTime CreateAt { get; set; }
        public string PlanContent { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<Interview> Interviews { get; set; }
    }
}
