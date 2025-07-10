using BackEnd_Api.Helpers;
using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CaseController : ControllerBase
    {
        private readonly ICaseRepository _caseRepository;
        private readonly IUserRepository _userRepository;

        public CaseController(ICaseRepository caseRepository, IUserRepository userRepository)
        {
            _caseRepository = caseRepository;
            _userRepository = userRepository;
        }

        //Tạo mới trường hợp bảo vệ hiện trường
        [Authorize]
        [HttpPost("create-protection")]
        public IActionResult CreateProtectionCase([FromBody] SceneProtection sceneProtection)
        {
            var userPermissions = _userRepository.GetPermissions();
            if (!userPermissions.Contains("Edit_Case"))
                return Forbid("You do not have permission to delete users.");

            var res = _caseRepository.CreateProtection(sceneProtection);

            return Ok(ApiResponseHelper<SceneProtection>.SuccessResult(null, "Protection scene successfully"));
        }
    }
}
