using BackEnd_Api.Dtos.Auth;
using BackEnd_Api.Models;
using Microsoft.AspNetCore.Mvc;
using BackEnd_Api.Helpers;
using Microsoft.EntityFrameworkCore;
using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly JwtTokenHelper _jwtTokenHelper;
        private readonly ApplicationDbContext _context;
        private readonly IUserRepository _userService;

        public AuthController(JwtTokenHelper jwtTokenHelper, ApplicationDbContext context, IUserRepository userService)
        {
            _jwtTokenHelper = jwtTokenHelper;
            _context = context;
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto loginDto)
        {
            try { 
                if (loginDto == null || string.IsNullOrEmpty(loginDto.UserName) || string.IsNullOrEmpty(loginDto.Password))
                {
                    return BadRequest("Invalid login request.");
                }

                var loginPasswordHash = _userService.HashPassword(loginDto.Password);

                var user = _context.Users.Include(u => u.Role)
                                         .ThenInclude(r => r.RolePermissions)
                                         .ThenInclude(rp => rp.Permission)
                                         .FirstOrDefault(u => u.UserName == loginDto.UserName && u.PasswordHash == loginPasswordHash);

                if (user == null)
                {
                    return Unauthorized("Invalid username or password.");
                }

                var token = _jwtTokenHelper.GenerateJwtToken(user);

                var response = ApiResponseHelper<object>.SuccessResult(new { token = token }, "Login successful");

                return Ok(response);
            }
            catch (Exception e)
            {
                var response = ApiResponseHelper<string>.FailureResult("Error when login", new[] { e.Message }, 500);
                return StatusCode(500, response);
            }
        }
    }
}
