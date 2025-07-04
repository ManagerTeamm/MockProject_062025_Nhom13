using System.ComponentModel.DataAnnotations;

namespace BackEnd_Api.Dtos.Auth
{
    public class RegisterDto
    {
        public required string Username { get; set; }

        [EmailAddress]
        public required string Email { get; set; }

        [MinLength(8)]
        public required string Password { get; set; }
    }
}
