using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class CaseEvidence : ISoftDeletable
    {
        public string CaseId { get; set; }
        public Case? Case { get; set; }
        public string EvidenceId { get; set; }
        public Evidence? Evidence { get; set; }
        public bool IsDeleted { get; set; }
    }
}
