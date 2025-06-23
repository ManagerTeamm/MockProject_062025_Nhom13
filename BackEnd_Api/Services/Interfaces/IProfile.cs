using BackEnd_Api.Helpers;

namespace BackEnd_Api.Services.Interfaces
{
    public interface IProfile
    {
        Task<ApiResponseHelper<string>> GetUserByTokenAsync(string token);
    }
}
