using BackEnd_Api.Helpers;
using BackEnd_Api.Models;
using BackEnd_Api.Services.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace BackEnd_Api.Services
{
    public class ProfilleService : IProfile
    {
        private readonly JwtTokenHelper _jwtTokenHelper;
        private readonly UserManager<ApplicationUser> _userManager;
        public ProfilleService(JwtTokenHelper jwtTokenHelper, UserManager<ApplicationUser> userManager)
        {
            _jwtTokenHelper = jwtTokenHelper;
            _userManager = userManager;
        }
        public async Task<ApiResponseHelper<string>> GetUserByTokenAsync(string token)
        {
            try
            {
                var userId = _jwtTokenHelper.GetUserIdFromToken(token);

                var userExist = await _userManager.FindByIdAsync(userId);

                if (userExist != null)
                {
                    return ApiResponseHelper<string>.SuccessResult(userExist.UserName, "Get User Completed", 200);
                }
                return ApiResponseHelper<string>.FailureResult("User not found", null, 400);
            }catch(Exception e)
            {
                return ApiResponseHelper<string>.FailureResult("Error when find user", new[] { e.Message }, 500);
            }
        }
    }
}
