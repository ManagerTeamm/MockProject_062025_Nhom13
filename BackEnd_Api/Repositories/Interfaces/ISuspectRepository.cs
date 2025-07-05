using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface ISuspectRepository
    {
        Task CreateSuspectAsync(Suspect suspect);
    }
}
