using BackEnd_Api.Dtos;
using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Repositories
{
    public class CaseRepository : Repository<Case>, ICaseRepository
    {
        // Vẫn cần ApplicationDbContext để truy cập các DbSet khác như Reports
        // vì IRepository<T> không cung cấp GetQueryable() trên toàn bộ DbContext
        private readonly ApplicationDbContext _context; // Đổi tên để tránh xung đột với _context của BaseRepository

        public CaseRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách các vụ án với khả năng tìm kiếm, phân trang và sắp xếp.
        /// Toàn bộ logic được đưa vào Repository.
        /// </summary>
        /// <param name="filter">Đối tượng chứa các tham số lọc, phân trang và sắp xếp.</param>
        /// <returns>Một PaginatedResultDto chứa danh sách các vụ án và thông tin phân trang.</returns>
        public async Task<PaginatedResultDto<CaseListItemDto>> GetCasesAsync(CaseFilterDto filter)
        {
            // Truy vấn trực tiếp qua _appContext để có thể Include và xây dựng truy vấn phức tạp
            var query = _context.Cases
                                   .Include(c => c.Reports) // BẮT BUỘC include Reports
                                   .Where(c => !c.IsDeleted);

            // Áp dụng tìm kiếm chung
            if (!string.IsNullOrEmpty(filter.SearchQuery))
            {
                var searchQueryLower = filter.SearchQuery.ToLower();
                query = query.Where(c =>
                    c.CaseId.ToLower().Contains(searchQueryLower) ||
                    c.TypeCase.ToLower().Contains(searchQueryLower) ||
                    c.Severity.ToLower().Contains(searchQueryLower) ||
                    c.Status.ToLower().Contains(searchQueryLower) ||
                    c.Reports.Any(r => r.ReporterFullname.ToLower().Contains(searchQueryLower)) ||
                    c.Reports.Any(r => r.CaseLocation.ToLower().Contains(searchQueryLower))
                );
            }

            var totalCount = await query.CountAsync();

            // Áp dụng sắp xếp
            if (!string.IsNullOrEmpty(filter.SortBy))
            {
                query = filter.SortBy.ToLower() switch
                {
                    "caseid" => filter.SortOrder?.ToLower() == "desc" ? query.OrderByDescending(c => c.CaseId) : query.OrderBy(c => c.CaseId),
                    "typeofcrime" => filter.SortOrder?.ToLower() == "desc" ? query.OrderByDescending(c => c.TypeCase) : query.OrderBy(c => c.TypeCase),
                    "levelofseverity" => filter.SortOrder?.ToLower() == "desc" ? query.OrderByDescending(c => c.Severity) : query.OrderBy(c => c.Severity),
                    "date" => filter.SortOrder?.ToLower() == "desc" ? query.OrderByDescending(c => c.CreateAt) : query.OrderBy(c => c.CreateAt),
                    "reporter" => filter.SortOrder?.ToLower() == "desc" ?
                                  query.OrderByDescending(c => c.Reports.OrderBy(r => r.ReportedAt).Select(r => r.ReporterFullname).FirstOrDefault()) :
                                  query.OrderBy(c => c.Reports.OrderBy(r => r.ReportedAt).Select(r => r.ReporterFullname).FirstOrDefault()),
                    "location" => filter.SortOrder?.ToLower() == "desc" ?
                                  query.OrderByDescending(c => c.Reports.OrderBy(r => r.ReportedAt).Select(r => r.CaseLocation).FirstOrDefault()) :
                                  query.OrderBy(c => c.Reports.OrderBy(r => r.ReportedAt).Select(r => r.CaseLocation).FirstOrDefault()),
                    "status" => filter.SortOrder?.ToLower() == "desc" ? query.OrderByDescending(c => c.Status) : query.OrderBy(c => c.Status),
                    _ => query.OrderByDescending(c => c.CreateAt)
                };
            }
            else
            {
                query = query.OrderByDescending(c => c.CreateAt);
            }

            var cases = await query.Skip((filter.PageNumber - 1) * filter.PageSize)
                                   .Take(filter.PageSize)
                                   .ToListAsync();

            // Ánh xạ thủ công từ Model Case sang DTO CaseListItemDto
            var caseListItemDtos = cases.Select(c => new CaseListItemDto
            {
                CaseId = c.CaseId,
                TypeOfCrime = c.TypeCase,
                LevelOfSeverity = c.Severity,
                Date = c.CreateAt,
                Reporter = c.Reports.OrderBy(r => r.ReportedAt).FirstOrDefault()?.ReporterFullname,
                Location = c.Reports.OrderBy(r => r.ReportedAt).FirstOrDefault()?.CaseLocation,
                Status = c.Status
            }).ToList();

            return new PaginatedResultDto<CaseListItemDto>
            {
                Items = caseListItemDtos,
                TotalCount = totalCount,
                PageNumber = filter.PageNumber,
                PageSize = filter.PageSize
            };
        }

        public async Task<SceneProtection> CreateProtection(SceneProtection sceneProtection)
        {
            if (sceneProtection == null)
            {
                throw new ArgumentNullException(nameof(sceneProtection));
            }
            await _context.SceneProtections.AddAsync(sceneProtection);
            await _context.SaveChangesAsync();
            return sceneProtection;
        }
    }
}
