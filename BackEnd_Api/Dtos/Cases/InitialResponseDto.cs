using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd_Api.Dtos.Cases
{
    public class InitialResponseDto
    {
        [JsonPropertyName("caseId")]
        public string CaseId { get; set; }

        [JsonPropertyName("dispatchTime")]
        public string? DispatchTime { get; set; }

        [JsonPropertyName("arrivalTime")]
        public string? ArrivalTime { get; set; }

        [JsonPropertyName("sceneAssessment")]
        public string? SceneAssessment { get; set; }

        [JsonPropertyName("assignedOfficers")]
        public List<OfficerDto> AssignedOfficers { get; set; } = new();

        [JsonPropertyName("preservationMeasures")]
        public List<SceneProtectionDto> PreservationMeasures { get; set; } = new();

        [JsonPropertyName("medicalRescueInfo")]
        public List<SceneSupportDto> MedicalRescueInfo { get; set; } = new();

        public class OfficerDto
        {
            [JsonPropertyName("userName")]
            public string UserName { get; set; }

            [JsonPropertyName("fullName")]
            public string FullName { get; set; }

            [JsonPropertyName("role")]
            public string Role { get; set; }

            [JsonPropertyName("phoneNumber")]
            public string PhoneNumber { get; set; }
        }

        public class SceneProtectionDto
        {
            [JsonPropertyName("sceneProtectionId")]
            public string? SceneProtectionId { get; set; }

            [JsonPropertyName("officerUserName")]
            public string OfficerUserName { get; set; }

            [JsonPropertyName("caseId")]
            public string CaseId { get; set; }

            [JsonPropertyName("startTime")]
            public string StartTime { get; set; }

            [JsonPropertyName("endTime")]
            public string EndTime { get; set; }

            [JsonPropertyName("protectionMethods")]
            public string ProtectionMethods { get; set; }

            [JsonPropertyName("areaCovered")]
            public string AreaCovered { get; set; }

            [JsonPropertyName("specialInstructions")]
            public string SpecialInstructions { get; set; }

            // For form submission (POST/PUT)
            [JsonIgnore]
            public List<IFormFile> Files { get; set; } = new();

            // For GET responses - file paths
            [JsonPropertyName("attachedFilePaths")]
            public List<string> AttachedFilePaths { get; set; } = new List<string>();
        }

        public class SceneSupportDto
        {
            [JsonPropertyName("sceneSupportId")]
            public string? SceneSupportId { get; set; }

            [JsonPropertyName("unitId")]
            public string UnitId { get; set; }

            [JsonPropertyName("supportType")]
            public string SupportType { get; set; }

            [JsonPropertyName("arrivalTime")]
            public string ArrivalTime { get; set; }

            [JsonPropertyName("personnelAssigned")]
            public string? PersonnelAssigned { get; set; }

            [JsonPropertyName("locationAssigned")]
            public string? LocationAssigned { get; set; }

            [JsonPropertyName("remarks")]
            public string? Remarks { get; set; }

            // For form submission (POST/PUT)
            [JsonIgnore]
            public List<IFormFile> Files { get; set; } = new();

            // For GET responses - file paths
            [JsonPropertyName("attachedFilePaths")]
            public List<string> AttachedFilePaths { get; set; } = new List<string>();
        }
    }
}