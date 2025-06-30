namespace BackEnd_Api.Models
{
    public class WitnessInterview
    {
        public int WitnessId { get; set; }
        public Witness Witness { get; set; }
        public int InterviewId { get; set; }
        public Interview Interview { get; set; }
        public bool IsDeleted { get; set; }
    }
}
