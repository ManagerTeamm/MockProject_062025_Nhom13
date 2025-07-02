using BackEnd_Api.Models;
using BackEnd_Api.Repos;
using BackEnd_Api.Repos.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BackEnd_Api.Helpers
{
    public class JwtTokenHelper
    {
        private readonly IRoleRepository _roleRepos;
        private readonly IConfiguration _config;
        public JwtTokenHelper(IConfiguration config, IRoleRepository roleRepos)
        {
            _config = config;
            _roleRepos = roleRepos;
        }
        public async Task<string> GenerateJwtToken(User user)
        {
            var role = await _roleRepos.GetByIdAsync(user.RoleId);
            var claims = new[]
            {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, role.Description)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                expires: DateTime.UtcNow.AddHours(3),
                claims: claims,
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string? GetUserIdFromToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false, // Set true nếu có Issuer
                    ValidateAudience = false, // Set true nếu có Audience
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                return principal.FindFirst(ClaimTypes.NameIdentifier)?.Value; // user.Id
            }
            catch
            {
                return null;
            }
        }
    }
}
