namespace BackEnd_Api.Models
{
    public class UserCase
    {
        public string OfficerId { get; set; }
        public ApplicationUser User { get; set; }
        public int CaseId { get; set; }
        public Case Case { get; set; }
        public bool Responsible { get; set; }
        public bool IsDeleted { get; set; }
    }
}
