using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class Timeline : ISoftDeletable
    {
        public string TimelineId { get; set; }
        public string CaseResultId { get; set; }
        public CaseResult? CaseResult { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? AttachedFile { get; set; }
        public string? Notes { get; set; }
        public string? Activity { get; set; }
        public bool IsDeleted { get; set; }
    }
}
