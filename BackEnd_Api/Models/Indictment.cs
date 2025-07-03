namespace BackEnd_Api.Models
{
    public class Indictment
    {
        public string IndictmentId { get; set; }
        public string ProsecutionId { get; set; }
        public Prosecution Prosecution { get; set; }
        public string? Content { get; set; }
        public DateTime? IssuedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
