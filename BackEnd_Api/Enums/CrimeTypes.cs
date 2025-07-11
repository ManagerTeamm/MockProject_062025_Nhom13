namespace BackEnd_Api.Enums
{
    public enum CrimeTypesReports
    {
        CrimesAgainstPersons,
        CrimesAgainstProperty,
        WhiteCollarCrimes,
        CyberCrimes,
        DrugRelatedCrimes,
        PublicOrderCrimes
    }
    public enum SeverityReports
    {
        Urgent,
        NoUrgent
    }
    public enum SeverityCases
    {
        Minor,
        Moderate,
        Serious,
        Critical
    }
    public enum ReportStatus
    {
        Approved,
        Pending,
        Rejected
    }
    public enum CaseStatus
    {
        NewCase,
        ProcessingInForPhase2,
        PendingApproveForPhase3,
        ProcessingInPhase3,
        Done
    }
}
