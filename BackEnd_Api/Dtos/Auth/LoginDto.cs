using System.ComponentModel.DataAnnotations;

namespace BackEnd_Api.Dtos.Auth
{
    public class LoginDto
    {
        public required string UserName { get; set; }

        [MinLength(8)]
        public required string Password { get; set; }
    }
}
