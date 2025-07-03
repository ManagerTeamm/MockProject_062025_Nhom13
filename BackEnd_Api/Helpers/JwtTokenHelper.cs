using BackEnd_Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackEnd_Api.Helpers
{
    public class JwtTokenHelper
    {
        private readonly IConfiguration _config;
        public JwtTokenHelper(IConfiguration config) => _config = config;

        public string GenerateJwtToken(User user)
        {

            var claims = new[]
            {
                new Claim("name", user.UserName),
                new Claim("role", user.Role.Description),       
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                expires: DateTime.UtcNow.AddHours(3),
                claims: claims,
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
