namespace BackEnd_Api.Dtos.ReportDtos
{

    public class ReportIncidentDto
    {
        public string TypeOfCrime { get; set; }
        public string Severity { get; set; }
        public DateTime OccurredAt { get; set; }
        public string? DetailedAddress { get; set; }
        public string? IncidentDescription { get; set; }
    }
}
