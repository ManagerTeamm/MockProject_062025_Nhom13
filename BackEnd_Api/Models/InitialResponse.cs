using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class InitialResponse: ISoftDeletable
    {
        public string InitialResponseId { get; set; }
        public string CaseId { get; set; }
        public DateTime DispatchTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string PreliminaryAssessment { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public bool IsDeleted { get; set; }

        // Navigation properties
        public virtual Case Case { get; set; }
        public virtual ICollection<ScenePreservationMeasure> ScenePreservationMeasures { get; set; } = new List<ScenePreservationMeasure>();
        public virtual ICollection<MedicalRescueSupport> MedicalRescueSupports { get; set; } = new List<MedicalRescueSupport>();
    }
}
