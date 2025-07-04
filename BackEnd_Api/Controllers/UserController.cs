using BackEnd_Api.Models;
using Microsoft.AspNetCore.Mvc;
using BackEnd_Api.Helpers;
using BackEnd_Api.Dtos;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [Authorize]
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var userPermissions = _userRepository.GetPermissions();
                if (!userPermissions.Contains("Manage_Users"))
                    return Forbid("You do not have permission to view users.");

                var users = await _userRepository.FindAsync(x=> !x.IsDeleted);

                if (!users.Any())
                    return NotFound("No users found.");

                return Ok(ApiResponseHelper<List<User>>.SuccessResult((List<User>)users, "Users retrieved successfully"));
            }
            catch (Exception e)
            {
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Error when finding users", new[] { e.Message }, 500));
            }
        }

        [HttpGet("get-user")]
        public async Task<IActionResult> GetUser([FromQuery] string userName)
        {
            try
            {
                var user = await _userRepository.FindOneAsync(u => u.UserName == userName && !u.IsDeleted);
                if (user == null)
                    return NotFound("User not found.");

                return Ok(ApiResponseHelper<User>.SuccessResult(user, "User retrieved successfully"));
            }
            catch (Exception e)
            {
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Error when finding user", new[] { e.Message }, 500));
            }
        }

        [Authorize]
        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser([FromBody] UserDto userDto)
        {
            try
            {
                var userPermissions = _userRepository.GetPermissions();
                if (!userPermissions.Contains("Manage_Users"))
                    return Forbid("You do not have permission to create users.");

                var existingUser = await _userRepository.FindOneAsync(u => u.UserName == userDto.UserName && !u.IsDeleted);
                if (existingUser != null)
                    return Conflict("User already exists.");

                var user = new User
                {
                    UserName = userDto.UserName,
                    Email = userDto.Email,
                    FullName = userDto.FullName,
                    PhoneNumber = userDto.PhoneNumber,
                    AvatarUrl = userDto.AvatarUrl,
                    RoleId = userDto.RoleId,
                    PasswordHash = _userRepository.HashPassword(userDto.Password),
                    DateAttended = DateTime.UtcNow,
                    IsDeleted = false
                };

                var result = _userRepository.AddAsync(user);
                if (result == null)
                    return BadRequest("Failed to create user.");

                return Ok(ApiResponseHelper<string>.SuccessResult(null, "User created successfully"));
            }
            catch (Exception e)
            {
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Error when creating user", new[] { e.Message }, 500));
            }
        }

        [Authorize]
        [HttpPut("update-user")]
        public async Task<IActionResult> EditUser([FromQuery] string username, [FromBody] UserDto userDto)
        {
            try
            {
                var userPermissions = _userRepository.GetPermissions();
                if (!userPermissions.Contains("Manage_Users"))
                    return Forbid("You do not have permission to edit users.");

                var user = await _userRepository.FindOneAsync(u => u.UserName == username && !u.IsDeleted);
                if (user == null)
                    return NotFound("User not found.");

                user.Email = userDto.Email;
                user.FullName = userDto.FullName;
                user.PhoneNumber = userDto.PhoneNumber;
                user.AvatarUrl = userDto.AvatarUrl;
                user.RoleId = userDto.RoleId;
                user.PasswordHash = _userRepository.HashPassword(userDto.Password);


                _userRepository.Update(user);

                return Ok(ApiResponseHelper<string>.SuccessResult(null, "User updated successfully"));
            }
            catch (Exception e)
            {
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Error when updating user", new[] { e.Message }, 500));
            }
        }

        [Authorize]
        [HttpDelete("delete-user")]
        public async Task<IActionResult> DeleteUser([FromQuery] string userId)
        {
            try
            {
                var userPermissions = _userRepository.GetPermissions();
                if (!userPermissions.Contains("Manage_Users"))
                    return Forbid("You do not have permission to delete users.");

                var user = await _userRepository.FindOneAsync(u => u.UserName == userId && !u.IsDeleted);
                if (user == null)
                    return NotFound("User not found.");

                _userRepository.Delete(user);

                return Ok(ApiResponseHelper<string>.SuccessResult(null, "User deleted successfully"));
            }
            catch (Exception e)
            {
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Error when deleting user", new[] { e.Message }, 500));
            }
        }
    }
}
