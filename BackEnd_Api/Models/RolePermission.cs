using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class RolePermission : ISoftDeletable
    {
        public string RoleId { get; set; }
        public Role Role { get; set; }
        public string PermissionId { get; set; }
        public Permission Permission { get; set; }
        public bool IsDeleted { get; set; }
    }
}
