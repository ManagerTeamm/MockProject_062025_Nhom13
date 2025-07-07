using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class WarrantEvidence : ISoftDeletable
    {
        public string WarrantId { get; set; }
        public Warrant Warrant { get; set; }
        public string EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public bool IsDeleted { get; set; }
    }
}
