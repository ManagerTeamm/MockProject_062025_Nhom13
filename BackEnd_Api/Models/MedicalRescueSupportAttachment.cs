namespace BackEnd_Api.Models
{
    public class MedicalRescueSupportAttachment
    {
        public string MedicalRescueSupportAttachmentId { get; set; }
        public string FilePath { get; set; }
        public string MedicalRescueSupportId { get; set; }

        // Navigation property
        public virtual MedicalRescueSupport MedicalRescueSupport { get; set; }
    }
}
