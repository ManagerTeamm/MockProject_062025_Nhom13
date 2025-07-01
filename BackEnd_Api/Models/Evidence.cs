namespace BackEnd_Api.Models
{
    public class Evidence
    {
        public string EvidenceId { get; set; }
        public string? MeasureSurveyId { get; set; }
        public MeasureSurvey MeasureSurvey { get; set; }
        public string? WarrantResultId { get; set; }
        public WarrantResult WarrantResult { get; set; }
        public string? ReportId { get; set; }
        public Report Report { get; set; }
        public string CollectedBy { get; set; }
        public User User { get; set; }
        public string TypeEvidence { get; set; }
        public string Description { get; set; }
        public DateTime CollectedAt { get; set; }
        public string CurrentLocation { get; set; }
        public string AttachedFile { get; set; }
        public string Status { get; set; }
        public bool IsDeleted { get; set; }
        public DigitalInvest DigitalInvest { get; set; }
        public ForensicInvest ForensicInvest { get; set; }
        public FinancialInvest FinancialInvest { get; set; }
        public PhysicalInvest PhysicalInvest { get; set; }
        public ICollection<RecordInfo> RecordInfos { get; set; }
        public ICollection<CaseEvidence> CaseEvidences { get; set; }
        public ICollection<WarrantEvidence> WarrantEvidences { get; set; }
        public ICollection<SuspectEvidence> SuspectEvidences { get; set; }
        public ICollection<VictimEvidence> VictimEvidences { get; set; }
    }
}
