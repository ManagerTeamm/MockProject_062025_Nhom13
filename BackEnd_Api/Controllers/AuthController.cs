using BackEnd_Api.Dtos.Auth;
using BackEnd_Api.Helpers;
using BackEnd_Api.Models;
using BackEnd_Api.Repos.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepo;
        private readonly JwtTokenHelper _jwtHelper;

        public AuthController(IConfiguration config, IUserRepository userRepo, JwtTokenHelper jwtHelper)
        {
            _config = config;
            _userRepo = userRepo;
            _jwtHelper = jwtHelper;
        }


        //login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            if (request == null)
                return BadRequest("Page recieves nothing. Contact the owner.");

            var user = await _userRepo.AuthenticateAsync(request.Username, request.Password);
            if (user == null)
                return Unauthorized("Invalid credentials");

            var token = _jwtHelper.GenerateJwtToken(user);
            return Ok(new { token = token });
        }
    }
}
