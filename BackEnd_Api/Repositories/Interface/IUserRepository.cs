using BackEnd_Api.Models;

namespace BackEnd_Api.Repos.Interface
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> AuthenticateAsync(string userName, string password);
    }
}
