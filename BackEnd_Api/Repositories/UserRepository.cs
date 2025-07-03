using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using BackEnd_Api.Dtos;
using BackEnd_Api.Models;
using BackEnd_Api.Repositories;
using BackEnd_Api.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Services
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserRepository(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
            : base(context)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        public List<string> GetPermissions()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null) return new List<string>();

            return user.Claims
                .Where(c => c.Type == "permissions")
                .SelectMany(c => c.Value.Split(','))
                .Distinct()
                .ToList();
        }
    }
}
