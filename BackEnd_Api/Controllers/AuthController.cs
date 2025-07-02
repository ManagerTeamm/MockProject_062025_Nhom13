using BackEnd_Api.Dtos.Auth;
using BackEnd_Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BackEnd_Api.Helpers;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly JwtTokenHelper _jwtTokenHelper;
        private readonly ApplicationDbContext _context;

        public AuthController(JwtTokenHelper jwtTokenHelper, ApplicationDbContext context)
        {
            _jwtTokenHelper = jwtTokenHelper;
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            if (loginDto == null || string.IsNullOrEmpty(loginDto.UserName) || string.IsNullOrEmpty(loginDto.Password))
            {
                return BadRequest("Invalid login request.");
            }

            var loginPasswordHash = HashPassword(loginDto.Password);
            var user = _context.Users.Include(u => u.Role).FirstOrDefault(u => u.UserName == loginDto.UserName && u.PasswordHash == loginPasswordHash);
            
            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var token = _jwtTokenHelper.GenerateJwtToken(user);
            var response = ApiResponseHelper<object>.SuccessResult(new {token = token}, "Login successful");

            return Ok(response);
        }

        [HttpGet("get-user")]
        public IActionResult GetUser([FromQuery]string userName)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserName == userName);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var response = ApiResponseHelper<User>.SuccessResult(user, "User retrieved successfully");

            return Ok(response);
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}
