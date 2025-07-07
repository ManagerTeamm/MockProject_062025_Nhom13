using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class PhysicalInvest : ISoftDeletable
    {
        public string EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsDeleted { get; set; }
    }
}
