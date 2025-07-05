namespace BackEnd_Api.Dtos.ReportDtos
{
    public class ReportRequestDto
    {
        public ReporterDto Reporter { get; set; }
        public ReportIncidentDto Incident { get; set; }
        public List<ReportRelevantPartyDto>? RelevantParties { get; set; }
        public List<ReportEvidenceDto>? Evidences { get; set; }
    }
}
