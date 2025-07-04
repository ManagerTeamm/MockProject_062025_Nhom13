namespace BackEnd_Api.Models
{
    public class SceneDescription
    {
        public string SceneDescriptionId { get; set; }
        public string CaseId { get; set; }
        public Case Case { get; set; }
        public string? Title { get; set; }
        public string Provider { get; set; }
        public User User { get; set; }
        public DateTime? Date { get; set; }
        public string? Description { get; set; }
        public bool IsDeleted { get; set; }
    }
}
