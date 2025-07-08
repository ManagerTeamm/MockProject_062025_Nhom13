using BackEnd_Api.Models;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IWitnessRepository
    {
        Task CreateWitnessAsync(Witness witness);
    }
}
