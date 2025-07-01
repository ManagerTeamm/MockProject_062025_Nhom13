namespace BackEnd_Api.Models
{
    public class WarrantResult
    {
        public string WarrantResultId { get; set; }
        public string WarrantId { get; set; }
        public Warrant Warrant { get; set; }
        public string PoliceResponse { get; set; }
        public User User { get; set; }
        public string Location { get; set; }
        public string Notes { get; set; }
        public DateTime? TimeActive { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<Evidence> Evidences { get; set; }
    }

}
