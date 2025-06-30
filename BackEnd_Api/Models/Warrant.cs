namespace BackEnd_Api.Models
{
    public class Warrant
    {
        public int WarrantId { get; set; }
        public int CaseId { get; set; }
        public Case Case { get; set; }
        public string WarrantName { get; set; }
        public string AttachedFile { get; set; }
        public DateTime TimePublish { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<WarrantResult> WarrantResults { get; set; }
        public ICollection<WarrantEvidence> WarrantEvidences { get; set; }
    }
}
