using BackEnd_Api.Models;
using BackEnd_Api.Repos.Interface;

namespace BackEnd_Api.Repos
{
    public class RoleRepository : Repository<Role>, IRoleRepository
    {
        private readonly ApplicationDbContext _context;
        public RoleRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
