using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class Role : ISoftDeletable
    {
        public string RoleId { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<RolePermission> RolePermissions { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
