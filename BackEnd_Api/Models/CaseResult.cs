using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace BackEnd_Api.Models
{
    public class CaseResult
    {
        public int CaseResultId { get; set; }
        public int CaseId { get; set; }
        public Case Case { get; set; }
        public DateTime ReportTime { get; set; }
        public string ReportAnalyst { get; set; }
        public string Summary { get; set; }
        public string IdentifyMotive { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<Sentence> Sentences { get; set; }
        public ICollection<Timeline> Timelines { get; set; }
    }
}
