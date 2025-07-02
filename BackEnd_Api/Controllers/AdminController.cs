using BackEnd_Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var users = _context.Users.ToList();
            if (users == null || !users.Any())
            {
                return NotFound("No users found.");
            }
            return Ok(users);
        }
    }
}
