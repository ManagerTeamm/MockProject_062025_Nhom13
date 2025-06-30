namespace BackEnd_Api.Models
{
    public class Indictment
    {
        public int IndictmentId { get; set; }
        public int ProsecutionId { get; set; }
        public Prosecution Prosecution { get; set; }
        public string Content { get; set; }
        public DateTime IssuedAt { get; set; }
        public bool IsDeleted { get; set; }
    }
}
