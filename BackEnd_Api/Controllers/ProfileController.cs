using BackEnd_Api.Helpers;
using BackEnd_Api.Models;
using BackEnd_Api.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IProfile _profile;
        public ProfileController(UserManager<ApplicationUser> userManager, IProfile profile)
        {
            _userManager = userManager;
            _profile = profile;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ApiResponseHelper<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponseHelper<string>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ApiResponseHelper<string>), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetProfile([FromQuery] string token)
        {
            if(token != null)
            {
                var result = await _profile.GetUserByTokenAsync(token);

                return StatusCode(result.StatusCode, result);
            }
            return StatusCode(400, "Token not found");
        }
    }
}
