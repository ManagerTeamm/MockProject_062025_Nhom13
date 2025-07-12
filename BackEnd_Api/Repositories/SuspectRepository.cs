using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd_Api.Dtos;
using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd_Api.Repositories
{
    public class SuspectRepository : Repository<Suspect>, ISuspectRepository
    {
        private readonly ApplicationDbContext _context;
        public SuspectRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Suspect>> GetAllSuspectsAsync()
        {
            return await _context.Suspects
                .Where(s => !s.IsDeleted)
                .ToListAsync();
        }

        public async Task<(List<Suspect> suspects, int totalCount)> GetSuspectsPaginatedAsync(int page, int pageSize)
        {
            var query = _context.Suspects.Where(s => !s.IsDeleted);
            var totalCount = await query.CountAsync();
            var suspects = await query
                .OrderBy(s => s.SuspectId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (suspects, totalCount);
        }

        public async Task<(List<Suspect> suspects, int totalCount)> FilterSuspectsAsync(string status, DateTime? catchTime, int page, int pageSize)
        {
            var query = _context.Suspects.Where(s => !s.IsDeleted);
            if (!string.IsNullOrEmpty(status))
                query = query.Where(s => s.Status == status);
            if (catchTime.HasValue)
                query = query.Where(s => s.CatchTime.HasValue && s.CatchTime.Value.Date == catchTime.Value.Date);
            var totalCount = await query.CountAsync();
            var suspects = await query
                .OrderBy(s => s.SuspectId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            return (suspects, totalCount);
        }

        public async Task AddSuspectAsync(CreateSuspectDto dto)
        {
            var suspect = new Suspect
            {
                SuspectId = dto.SuspectId,
                CaseId = dto.CaseId,
                Fullname = dto.Fullname,
                Gender = dto.Gender,
                Dob = dto.Dob != default ? new DateTime(dto.Dob.Year, dto.Dob.Month, dto.Dob.Day) : null,
                National = dto.Nationality,
                Identification = dto.Identification,
                CatchTime = dto.CatchTime != default ? new DateTime(dto.CatchTime.Year, dto.CatchTime.Month, dto.CatchTime.Day) : null,
                Status = dto.Status,
                Address = dto.Address,
                Description = dto.Description,
                PhoneNumber = dto.PhoneNumber,
                MugshotUrl = dto.MugshotUrl,
                FingerPrintsHash = dto.FingerprintHash,
                HealthStatus = dto.HealthStatus,
                IsDeleted = false
            };
            await _context.Suspects.AddAsync(suspect);
            await _context.SaveChangesAsync();
        }
    }
} 