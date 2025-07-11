using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd_Api.Dtos.Cases
{
    // Để binding FormData, mình sẽ đánh dấu [FromForm] ở controller hoặc trên class này
    public class InitialResponseDto
    {
        [FromForm]
        [JsonPropertyName("caseId")]
        public string CaseId { get; set; }

        // Nếu vẫn muốn giữ string "HH:mm" thì để nguyên, controller có thể parse thành TimeSpan nếu cần
        [FromForm]
        [JsonPropertyName("dispatchTime")]
        public string? DispatchTime { get; set; }

        [FromForm]
        [JsonPropertyName("arrivalTime")]
        public string? ArrivalTime { get; set; }

        [FromForm]
        [JsonPropertyName("sceneAssessment")]
        public string? SceneAssessment { get; set; }

        [FromForm]
        [JsonPropertyName("assignedOfficers")]
        public List<OfficerDto> AssignedOfficers { get; set; } = new();

        [FromForm]
        [JsonPropertyName("preservationMeasures")]
        public List<SceneProtectionDto> PreservationMeasures { get; set; } = new();

        [FromForm]
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
            [JsonPropertyName("id")]
            public string? SceneProtectionId { get; set; }

            [FromForm(Name = "officerUserName")]
            public string OfficerUserName { get; set; }

            [FromForm(Name = "caseId")]
            public string CaseId { get; set; }

            [FromForm(Name = "startTime")]
            public string StartTime { get; set; }

            [FromForm(Name = "endTime")]
            public string EndTime { get; set; }

            [FromForm(Name = "protectionMethods")]
            public string ProtectionMethods { get; set; }

            [FromForm(Name = "areaCovered")]
            public string AreaCovered { get; set; }

            [FromForm(Name = "specialInstructions")]
            public string SpecialInstructions { get; set; }

            [FromForm(Name = "preservationMeasuresFiles")]
            [JsonIgnore] // tránh serialize chung với JSON nếu controller trả về
            public List<IFormFile> Files { get; set; } = new();
        }

        public class SceneSupportDto
        {
            [JsonPropertyName("id")]
            public string? SceneSupportId { get; set; }

            [FromForm]
            [JsonPropertyName("unitId")]
            public string UnitId { get; set; }

            [FromForm]
            [JsonPropertyName("supportType")]
            public string SupportType { get; set; }

            // Giữ string để đơn giản, parse TimeSpan/DateTime trong controller nếu cần
            [FromForm]
            [JsonPropertyName("arrivalTime")]
            public string ArrivalTime { get; set; }

            [FromForm]
            [JsonPropertyName("personnelAssigned")]
            public string? PersonnelAssigned { get; set; }

            [FromForm]
            [JsonPropertyName("locationAssigned")]
            public string? LocationAssigned { get; set; }

            [FromForm]
            [JsonPropertyName("remarks")]
            public string? Remarks { get; set; }

            [FromForm(Name = "medicalFiles")]
            [JsonIgnore]
            public List<IFormFile> Files { get; set; } = new();
        }
    }
}
