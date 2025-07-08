using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class SceneProtection : ISoftDeletable
    {
        public string SceneProtectionId { get; set; }
        public string CaseId { get; set; }
        public Case Case { get; set; }
        public DateTime? TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }
        public string? Description { get; set; }
        public string? LocationCover { get; set; }
        public string? Notes { get; set; }
        public string? AttachedFiles { get; set; }
        public bool IsDeleted { get; set; }
    }
}
