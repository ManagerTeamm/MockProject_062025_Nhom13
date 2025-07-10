namespace BackEnd_Api.Dtos
{

    public class CaseListItemDto
    {
        public string CaseId { get; set; }
        public string TypeOfCrime { get; set; } // Map từ TypeCase
        public string LevelOfSeverity { get; set; } // Map từ Severity
        public DateTime? Date { get; set; } // Map từ CreateAt
        public string? Reporter { get; set; } // Sẽ lấy từ Report.ReporterFullname
        public string? Location { get; set; } // Sẽ lấy từ Report.CaseLocation
        public string Status { get; set; }
    }
    public class CaseFilterDto
    {
        public string? SearchQuery { get; set; } // Cho ô tìm kiếm chung
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10; // Mặc định 10 entries như UI
        public string? SortBy { get; set; } // Ví dụ: "Date", "CaseId", "TypeOfCrime", "Severity", "Reporter", "Location", "Status"
        public string? SortOrder { get; set; } = "asc"; // "asc" hoặc "desc"
    }
}
