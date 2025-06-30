namespace BackEnd_Api.Models
{
    public class WarrantResult
    {
        public int WarrantResultId { get; set; }
        public int WarrantId { get; set; }
        public Warrant Warrant { get; set; }
        public string PoliceResponse { get; set; }
        public string Location { get; set; }
        public string Notes { get; set; }
        public DateTime? TimeActive { get; set; }
        public bool IsDeleted { get; set; }
    }

}
