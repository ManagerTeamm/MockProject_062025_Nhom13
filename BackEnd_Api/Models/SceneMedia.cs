namespace BackEnd_Api.Models
{
    public class SceneMedia
    {
        public string SceneMediaId { get; set; }
        public string CaseId { get; set; }
        public Case Case { get; set; }
        public DateTime? DateTaken { get; set; }
        public string? SceneSketchUrl { get; set; }
        public string CapturedBy { get; set; }
        public User User { get; set; }
        public string? Description { get; set; }
        public bool IsDeleted { get; set; } 
    }
}
