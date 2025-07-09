using System;
using System.ComponentModel.DataAnnotations;

namespace BackEnd_Api.Dtos
{
    public class EvidenceDto
    {
        public string EvidenceId { get; set; }
        public string CaseId { get; set; }
        public string Description { get; set; }
        public DateTime CollectedAt { get; set; }
        public string Collector { get; set; }
        public string Status { get; set; }
        public CaseInfoDto CaseInfo { get; set; }
        public SuspectInfoDto SuspectInfo { get; set; }
    }
    public class CreateEvidenceDto
    {
        [Required(ErrorMessage = "EvidenceId is required.")]
        [RegularExpression(@"^E\\d{3}$", ErrorMessage = "EvidenceId must be in format E followed by 3 digits (e.g., E001, E002).")]
        public string EvidenceId { get; set; }

        [Required(ErrorMessage = "CaseId is required.")]
        public string CaseId { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(500, MinimumLength = 10, ErrorMessage = "Description must be between 10 and 500 characters.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "CollectedAt is required.")]
        public DateTime CollectedAt { get; set; }

        [Required(ErrorMessage = "CollectedBy is required.")]
        public string CollectedBy { get; set; }

        [Required(ErrorMessage = "TypeEvidence is required.")]
        public string TypeEvidence { get; set; }

        [Required(ErrorMessage = "CurrentLocation is required.")]
        [StringLength(100, ErrorMessage = "CurrentLocation must be at most 100 characters.")]
        public string CurrentLocation { get; set; }

        public string AttachedFile { get; set; }
        public string Status { get; set; }
    }
    public class CaseInfoDto
    {
        public string CaseId { get; set; }
        public string Type { get; set; }
        public string Severity { get; set; }
        public string Status { get; set; }
        public string Summary { get; set; }
    }
    public class SuspectInfoDto
    {
        public string SuspectId { get; set; }
        public string FullName { get; set; }
        public string Status { get; set; }
    }
}
