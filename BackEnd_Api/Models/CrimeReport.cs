namespace BackEnd_Api.Models
{
    public class CrimeReport
    {
        public int Id { get; set; }
        public DateTime ReportedAt { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string ReporterName { get; set; }  
        public string VictimName { get; set; }   
        public string SuspectDescription { get; set; }
    }
}
