using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEnd_Api.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using BackEnd_Api.Dtos;
using static BackEnd_Api.Dtos.PatrolOfficerDto;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatrolOfficerUserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public PatrolOfficerUserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedResult<PatrolOfficerDto>>> GetPatrolOfficers(
            [FromQuery] string? searchQuery,
            [FromQuery] string? presentStatus,
            [FromQuery] string? zone,
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            IQueryable<User> query = _context.Users
                                        .Include(u => u.Role)
                                        .Include(u => u.UserCases)
                                            .ThenInclude(uc => uc.Case)
                                        .Where(u => !u.IsDeleted);

            query = query.Where(u => u.Role != null && u.Role.Description == "Patrol Officer");

            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                string searchLower = searchQuery.ToLower();
                query = query.Where(u => u.FullName.ToLower().Contains(searchLower) ||
                                         u.UserName.ToLower().Contains(searchLower) ||
                                         u.Email.ToLower().Contains(searchLower) ||
                                         (u.PhoneNumber != null && u.PhoneNumber.ToLower().Contains(searchLower)));
            }

            if (!string.IsNullOrWhiteSpace(presentStatus))
            {
                if (presentStatus.Equals("OnAboveCase", StringComparison.OrdinalIgnoreCase))
                {
                    query = query.Where(u => u.UserCases.Any(uc => !uc.IsDeleted && uc.Case != null && uc.Case.Status != "Closed"));
                }
                else if (presentStatus.Equals("Idle", StringComparison.OrdinalIgnoreCase))
                {
                    query = query.Where(u => !u.UserCases.Any(uc => !uc.IsDeleted && uc.Case != null && uc.Case.Status != "Closed"));
                }
            }

            if (!string.IsNullOrWhiteSpace(zone))
            {
                // Zone filtering logic would go here if 'Zone' was a property on User or a related entity
            }

            var totalCount = await query.CountAsync();

            var officers = await query
                .OrderBy(u => u.FullName)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(u => new PatrolOfficerDto
                {
                    UserName = u.UserName,
                    FullName = u.FullName,
                    PresentStatus = u.UserCases.Any(uc => !uc.IsDeleted && uc.Case != null && uc.Case.Status != "Closed")
                                    ? "On Above Case"
                                    : "Idle",
                    Role = u.Role != null ? u.Role.Description : "N/A",
                    PhoneNumber = u.PhoneNumber,
                    Zone = "Sector 5, District 2"
                })
                .ToListAsync();

            return Ok(new PaginatedResult<PatrolOfficerDto>
            {
                Items = officers,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            });
        }
    }
}