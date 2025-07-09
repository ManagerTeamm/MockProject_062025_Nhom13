using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using BackEnd_Api.Dtos;

namespace BackEnd_Api.Repositories
{
    public class PatrolOfficerRepository : Repository<User>, IPatrolOfficerRepository
    {
        public PatrolOfficerRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<PatrolOfficerDto.PaginatedResult<PatrolOfficerDto>> GetPaginatedPatrolOfficersAsync(
            string? searchQuery,
            string? presentStatus,
            string? zone, // Tham số zone vẫn được nhận, nhưng sẽ không được sử dụng để lọc
            int pageNumber,
            int pageSize)
        {
            IQueryable<User> query = _dbSet
                                         .Include(u => u.Role)
                                         .Include(u => u.UserCases)
                                             .ThenInclude(uc => uc.Case)
                                         .Where(u => !u.IsDeleted &&
                                                     u.Role != null &&
                                                     u.Role.Description == "Patrol Officer");

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

            // Phần lọc theo Zone được giữ rỗng như trước, vì không muốn sửa model User
            // Điều này có nghĩa là tham số 'zone' từ frontend sẽ không có tác dụng lọc trên database.
            if (!string.IsNullOrWhiteSpace(zone))
            {
                // Logic lọc theo Zone không thể áp dụng ở đây nếu không có thuộc tính Zone trong User model.
                // Nếu bạn muốn lọc theo Zone, bạn cần lưu trữ thông tin Zone trong model User hoặc một bảng liên quan.
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

            return new PatrolOfficerDto.PaginatedResult<PatrolOfficerDto>
            {
                Items = officers,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }
    }
}