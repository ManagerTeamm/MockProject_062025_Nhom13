namespace BackEnd_Api.Models
{
    public class ReportWitness
    {
        public string ReportId { get; set; }
        public Report Report { get; set; }
        public string WitnessId { get; set; }
        public Witness Witness { get; set; }
        public string? ImageUrls { get; set; }
        public bool IsDeleted { get; set; }
    }
}
