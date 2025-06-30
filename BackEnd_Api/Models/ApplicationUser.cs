using System.Data;
using Microsoft.AspNetCore.Identity;

namespace BackEnd_Api.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Fullname { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime CreateAt { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<UserCase> UserCases { get; set; }
        public ICollection<Interview> Interviews { get; set; }
        public ICollection<Prosecution> Prosecutions { get; set; }
        public ICollection<Question> Questions { get; set; }
        public ICollection<InvestigationPlan> InvestigationPlans { get; set; }
        public ICollection<Report> ReportsApproved { get; set; }
        public ICollection<Evidence> EvidencesCollected { get; set; }
        public ICollection<Arrest> Arrests { get; set; }
    }
}
