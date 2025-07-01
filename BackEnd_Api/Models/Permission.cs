namespace BackEnd_Api.Models
{
    public class Permission
    {
        public string PermissionId { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<RolePermission> RolePermissions { get; set; }
    }
}
