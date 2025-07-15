namespace BackEnd_Api.Models
{
    public class ScenePreservationMeasureAttachment
    {
        public string ScenePreservationMeasureAttachmentId { get; set; }
        public string FilePath { get; set; }
        public string ScenePreservationMeasureId { get; set; }

        // Navigation property
        public virtual ScenePreservationMeasure ScenePreservationMeasure { get; set; }
    }
}
