namespace BackEnd_Api.Models
{
    public class Inmate
    {
        public int InmateId { get; set; }
        public int SentenceId { get; set; }
        public Sentence Sentence { get; set; }
        public string Fullname { get; set; }
        public string AssignedFacility { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? ExpectedRelease { get; set; }
        public string HealthStatus { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }
    }
}
