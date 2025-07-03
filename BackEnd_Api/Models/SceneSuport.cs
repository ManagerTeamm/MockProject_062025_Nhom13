namespace BackEnd_Api.Models
{
    public class SceneSuport
    {
        public string SceneSuportId { get; set; }
        public string CaseId { get; set; }
        public Case Case { get; set; }
        public  string TypeSuport { get; set; }
        public string? LocationAssigned { get; set; }
        public string? Notes { get; set; }
        public string? AttachedFiles { get; set; }
        public bool IsDeleted { get; set; }
    }
}
