using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IVictimRepository
    {
        Task CreateVictimAsync(Victim victim);
    }
}
