namespace BackEnd_Api.Models
{
    public class UserCase
    {
        public string OfficerId { get; set; }
        public User User { get; set; }
        public string CaseId { get; set; }
        public Case Case { get; set; }
        public string Responsible { get; set; }
        public bool IsDeleted { get; set; }
    }
}
