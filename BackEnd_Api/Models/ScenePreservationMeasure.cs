using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class ScenePreservationMeasure : ISoftDeletable
    {
        public string ScenePreservationMeasureId { get; set; }
        public string ResponsibleOfficerUserName { get; set; }
        public string InitialResponseId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? ProtectionMethods { get; set; }
        public string? AreaCovered { get; set; }
        public string? Notes { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }

        // Navigation properties
        public virtual User ResponsibleOfficer { get; set; }
        public virtual InitialResponse InitialResponse { get; set; }
        public virtual ICollection<ScenePreservationMeasureAttachment> Attachments { get; set; } = new List<ScenePreservationMeasureAttachment>();
    }
}
