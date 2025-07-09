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

        //Lấy danh sách người dùng
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

        //Lấy thông tin người dùng theo tên đăng nhập
        [Authorize]
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

        //Tạo người dùng mới
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

                await  _userRepository.AddAsync(user);

                return Ok(ApiResponseHelper<string>.SuccessResult(null, "User created successfully"));
            }
            catch (Exception e)
            {
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Error when creating user", new[] { e.Message }, 500));
            }
        }

        //Sửa thông tin người dùng
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

                await _userRepository.Update(user);

                return Ok(ApiResponseHelper<string>.SuccessResult(null, "User updated successfully"));
            }
            catch (Exception e)
            {
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Error when updating user", new[] { e.Message }, 500));
            }
        }

        //Xóa người dùng
        [Authorize]
        [HttpDelete("delete-user")]
        public async Task<IActionResult> DeleteUser([FromQuery] string username)
        {
            try
            {
                var userPermissions = _userRepository.GetPermissions();
                if (!userPermissions.Contains("Manage_Users"))
                    return Forbid("You do not have permission to delete users.");

                var user = await _userRepository.FindOneAsync(u => u.UserName == username && !u.IsDeleted);
                if (user == null)
                    return NotFound("User not found.");

                await _userRepository.Delete(user);

                return Ok(ApiResponseHelper<string>.SuccessResult(null, "User deleted successfully"));
            }
            catch (Exception e)
            {
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Error when deleting user", new[] { e.Message }, 500));
            }
        }
    }
}
