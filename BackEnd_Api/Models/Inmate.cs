namespace BackEnd_Api.Models
{
    public class Inmate
    {
        public string InmateId { get; set; }
        public string SentenceId { get; set; }
        public Sentence Sentence { get; set; }
        public string Fullname { get; set; }
        public string? AssignedFacility { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ExpectedRelease { get; set; }
        public string? HealthStatus { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }
    }
}
