using System;

namespace BackEnd_Api.Dtos
{
    public class SuspectDto
    {
        public string CaseId { get; set; }
        public string SuspectId { get; set; }
        public string? Fullname { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? Status { get; set; }
        public DateTime? CatchTime { get; set; }
    }
} 