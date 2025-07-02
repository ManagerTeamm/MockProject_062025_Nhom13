using static System.Net.Mime.MediaTypeNames;

namespace BackEnd_Api.Models
{
    public class Sentence
    {
        public string SentenceId { get; set; }
        public string CaseId { get; set; }
        public Case Case { get; set; }
        public string CaseResultId { get; set; }
        public CaseResult CaseResult { get; set; }
        public string SentenceType { get; set; }
        public string? Duration { get; set; }
        public string Condition { get; set; }
        public DateTime SentencingDate { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<Inmate> Inmates { get; set; }
    }
}
