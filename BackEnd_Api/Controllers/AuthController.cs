using BackEnd_Api.Dtos.Auth;
using BackEnd_Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using BackEnd_Api.Helpers;
namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        private readonly JwtTokenHelper _jwtHelper;

        public AuthController(UserManager<ApplicationUser> userManager, IConfiguration config, JwtTokenHelper jwtHelper)
        {
            _userManager = userManager;
            _config = config;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var user = new ApplicationUser { UserName = model.Username, Email = model.Email };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
                return Ok(new { message = "User created successfully" });

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = GenerateJwtToken(user);
                return Ok(new { token });
            }
            return Unauthorized();
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                expires: DateTime.UtcNow.AddHours(3),
                claims: claims,
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new { message = "Logged out successfully. Please remove the token on client side." });
        }

  
        [HttpGet("profile")]
        public async Task<IActionResult> GetUserProfile(string token)
        {
            var userId = _jwtHelper.GetUserIdFromToken(token);

            var userExist = await _userManager.FindByIdAsync(userId);

            if (userExist == null)
            {
                return Unauthorized("User ID not found in token.");
            }


            var userProfile = new UserProfileDto
            {
                Id = userExist.Id,
                Username = userExist.UserName,
                Email = userExist.Email
                
            };

            return Ok(userProfile);
            
        }

    }
}