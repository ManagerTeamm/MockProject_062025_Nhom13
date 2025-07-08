using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class Witness : ISoftDeletable
    {
        public string WitnessId { get; set; }
        public string? CaseId { get; set; }
        public Case? Case { get; set; }
        public string? Fullname { get; set; }
        public string? National { get; set; }
        public string? Gender { get; set; }
        public string? Description { get; set; }
        public string? Contact { get; set; }
        public string? Statement { get; set; }
        public bool IsDeleted { get; set; }
    }
}
