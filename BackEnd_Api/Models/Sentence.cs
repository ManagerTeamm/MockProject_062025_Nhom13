using static System.Net.Mime.MediaTypeNames;

namespace BackEnd_Api.Models
{
    public class Sentence
    {
        public int SentenceId { get; set; }
        public int CaseId { get; set; }
        public Case Case { get; set; }
        public int CaseResultId { get; set; }
        public CaseResult CaseResult { get; set; }
        public string SentenceType { get; set; }
        public int? Duration { get; set; }
        public string Condition { get; set; }
        public DateTime SentencingDate { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<Inmate> Inmates { get; set; }
    }
}
