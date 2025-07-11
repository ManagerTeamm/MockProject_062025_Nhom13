using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class Event : ISoftDeletable
    {
        public string EventId { get; set; }
        public string SuspectId { get; set; }
        public Suspect? Suspect { get; set; }
        public string CaseId { get; set; }
        public Case? Case { get; set; }
        public DateTime? TimeStart { get; set; }
        public DateTime? TimeEnd { get; set; }
        public string EventName { get; set; }
        public string? Description { get; set; }
        public bool IsDeleted { get; set; }
    }
}
