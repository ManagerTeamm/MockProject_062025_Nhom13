namespace BackEnd_Api.Models
{
    public class Question
    {
        public string QuestionId { get; set; }
        public string InterviewId { get; set; }
        public Interview Interview { get; set; }
        public string CreatedBy { get; set; }
        public User User { get; set; }
        public string Content { get; set; }
        public string Answer { get; set; }
        public string Reliability { get; set; }
        public bool IsDeleted { get; set; }
    }
}
