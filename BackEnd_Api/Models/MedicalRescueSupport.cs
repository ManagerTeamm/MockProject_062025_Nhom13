using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class MedicalRescueSupport : ISoftDeletable
    {
        public string MedicalRescueSupportId { get; set; }
        public string UnitId { get; set; }
        public string SupportType { get; set; }
        public string? PersonelAssigned { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string? LocationAssigned { get; set; }
        public string? Notes { get; set; }
        public string InitialResponseId { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public bool IsDeleted { get; set; }

        // Navigation properties
        public virtual InitialResponse InitialResponse { get; set; }
        public virtual ICollection<MedicalRescueSupportAttachment> Attachments { get; set; } = new List<MedicalRescueSupportAttachment>();
    }
}
