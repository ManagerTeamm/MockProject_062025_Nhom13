using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class ReportParties : ISoftDeletable
    {
        public string ReportPartiesId { get; set; }
        public string ReportId { get; set; }
        public Report? Report { get; set; }
        public string? FullName { get; set; }
        public string TypeOfParties { get; set; }
        public string? Gender { get; set; }
        public string? National { get; set; }
        public string? Description { get; set; }
        public bool IsDeleted { get; set; }
    }
}
