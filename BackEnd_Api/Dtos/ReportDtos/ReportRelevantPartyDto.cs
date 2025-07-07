namespace BackEnd_Api.Dtos.ReportDtos
{
    public class ReportRelevantPartyDto
    {
        public string Role { get; set; }
        public string? FullName { get; set; }
        public string? Statement { get; set; }
        public string? Gender { get; set; }
        public string? Nationality { get; set; }
        public string? Contact { get; set; }

        // files
        public List<IFormFile>? Attachments { get; set; }
    }
}
