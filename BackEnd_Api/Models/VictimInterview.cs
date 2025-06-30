namespace BackEnd_Api.Models
{
    public class VictimInterview
    {
        public int VictimId { get; set; }
        public Victim Victim { get; set; }
        public int InterviewId { get; set; }
        public Interview Interview { get; set; }
        public bool IsDeleted { get; set; }
    }
}
