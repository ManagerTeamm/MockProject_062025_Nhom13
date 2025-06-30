namespace BackEnd_Api.Models
{
    public class FinancialInvest
    {
        public int EvidenceId { get; set; }
        public Evidence Evidence { get; set; }
        public string Summary { get; set; }
        public bool IsDeleted { get; set; }
    }
}
