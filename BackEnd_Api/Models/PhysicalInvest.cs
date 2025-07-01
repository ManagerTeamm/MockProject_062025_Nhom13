namespace BackEnd_Api.Models
{
    public class PhysicalInvest
    {
        public string EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public string ImageUrl { get; set; }
        public bool IsDeleted { get; set; }
    }
}
