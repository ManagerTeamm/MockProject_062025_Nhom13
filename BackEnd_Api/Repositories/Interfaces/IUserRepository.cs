using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        string HashPassword(string password);
        List<string> GetPermissions();
        Task<User?> AuthenticateAsync(string username, string password);
    }
}
