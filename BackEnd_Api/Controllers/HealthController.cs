using Microsoft.AspNetCore.Mvc;

namespace BackEnd_Api.Controllers
{
    [ApiController]
    public class HealthController : ControllerBase
    {
        [HttpGet("/")]
        public IActionResult Index()
        {
            return Ok(new { 
                message = "Crime Investigation API is running", 
                timestamp = DateTime.UtcNow,
                version = "1.0"
            });
        }

        [HttpGet("/api")]
        public IActionResult ApiRoot()
        {
            return Ok(new { 
                message = "Crime Investigation API endpoints",
                endpoints = new {
                    auth = "/api/Auth/login",
                    users = "/api/User/users",
                    cases = "/api/Case",
                    evidence = "/api/Evidence",
                    reports = "/api/Report",
                    suspects = "/api/Suspect"
                }
            });
        }

        [HttpGet("/health")]
        public IActionResult Health()
        {
            return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
        }
    }
}
