using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class FinancialInvest : ISoftDeletable
    {
        public string EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public string? AttachedFiles { get; set; }
        public string? Summary { get; set; }
        public bool IsDeleted { get; set; }
    }
}
