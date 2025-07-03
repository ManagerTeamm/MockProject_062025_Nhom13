using System.ComponentModel.DataAnnotations;

namespace BackEnd_Api.Dtos.Auth
{
    public class LoginDto
    {
        [MinLength(1)]
        public required string Username { get; set; }
        [MinLength(8)]
        public required string Password { get; set; }
    }
}
