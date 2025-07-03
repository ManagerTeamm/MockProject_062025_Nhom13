namespace BackEnd_Api.Models
{
    public class RecordInfo
    {
        public string RecordInfoId { get; set; }
        public string EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public string TypeName { get; set; }
        public string? Source { get; set; }
        public DateTime? DateCollected { get; set; }
        public string? Summary { get; set; }
        public bool IsDeleted { get; set; }
    }
}
