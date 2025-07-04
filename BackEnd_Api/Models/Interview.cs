namespace BackEnd_Api.Models
{
    public class Interview
    {
        public string InterviewId { get; set; }
        public string? InvestigationPlanId { get; set; }
        public InvestigationPlan InvestigationPlan { get; set; }
        public string InterviewerId { get; set; }
        public User User { get; set; }
        public string IntervieweeId { get; set; }
        public string TypeInterviewee { get; set; }
        public string Location { get; set; }
        public string? AttachedFile { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}
