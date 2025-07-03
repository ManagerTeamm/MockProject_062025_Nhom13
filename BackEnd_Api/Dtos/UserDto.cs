using System.ComponentModel.DataAnnotations;

namespace BackEnd_Api.Dtos
{
    public class UserDto
    {
        [Required(ErrorMessage = "User ID is required.")]
        public string UserName { get; set; }
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Full name is required.")]
        public string FullName { get; set; }
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long.")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Password hash is required.")]
        public string PhoneNumber { get; set; }
        public string? AvatarUrl { get; set; }
        public string RoleId { get; set; }
    }
}
