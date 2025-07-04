namespace BackEnd_Api.Models
{
    public class User
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime DateAttended { get; set; }
        public string RoleId { get; set; }
        public Role Role { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<SceneDescription> SceneDescriptions { get; set; }
        public ICollection<SceneMedia> SceneMedias { get; set; }
        public ICollection<InvestigationPlan> InvestigationPlans { get; set; }
        public ICollection<UserCase> UserCases { get; set; }
        public ICollection<Prosecution> Prosecutions { get; set; }
        public ICollection<Question> Questions { get; set; }
        public ICollection<Interview> Interviews { get; set; }
        public ICollection<Report> Reports { get; set; }
        public ICollection<Evidence> Evidences { get; set; }
        public ICollection<Arrest> Arrests { get; set; }
        public ICollection<Warrant> Warrants { get; set; }
        public ICollection<WarrantResult> WarrantResults { get; set; }
    }
}
