namespace BackEnd_Api.Models
{
    public class Witness
    {
        public int WitnessId { get; set; }
        public int CaseId { get; set; }
        public Case Case { get; set; }
        public string Fullname { get; set; }
        public string Contact { get; set; }
        public string Statement { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<WitnessInterview> WitnessInterviews { get; set; }
    }
}
