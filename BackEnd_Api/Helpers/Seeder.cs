using BackEnd_Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace BackEnd_Api.Helpers
{
    public class Seeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            // Đảm bảo DB đã được tạo
            context.Database.Migrate();

            // ---- Seed Roles ----
            if (!context.Roles.Any())
            {
                context.Roles.AddRange(
                    new Role { RoleId = "1", Description = "Admin", IsDeleted = false },
                    new Role { RoleId = "2", Description = "Patrol Officer", IsDeleted = false },
                    new Role { RoleId = "3", Description = "Investigator", IsDeleted = false },
                    new Role { RoleId = "4", Description = "Forensic Analyst", IsDeleted = false },
                    new Role { RoleId = "5", Description = "Prosecutor", IsDeleted = false },
                    new Role { RoleId = "6", Description = "Financial Analyst", IsDeleted = false },
                    new Role { RoleId = "7", Description = "Evidence Custodian", IsDeleted = false },
                    new Role { RoleId = "8", Description = "Chief of Police", IsDeleted = false },
                    new Role { RoleId = "9", Description = "Detective", IsDeleted = false },
                    new Role { RoleId = "10", Description = "Cybercrime Specialist", IsDeleted = false },
                    new Role { RoleId = "11", Description = "Report Approver", IsDeleted = false },
                    new Role { RoleId = "12", Description = "Legal Counsel", IsDeleted = false },
                    new Role { RoleId = "13", Description = "Records Manager", IsDeleted = false },
                    new Role { RoleId = "14", Description = "Public Relations Officer", IsDeleted = false },
                    new Role { RoleId = "15", Description = "Training Officer", IsDeleted = false },
                    new Role { RoleId = "16", Description = "Field Officer", IsDeleted = false },
                    new Role { RoleId = "17", Description = "Case Manager", IsDeleted = false },
                    new Role { RoleId = "18", Description = "Security Analyst", IsDeleted = false },
                    new Role { RoleId = "19", Description = "Witness Protection Officer", IsDeleted = false },
                    new Role { RoleId = "20", Description = "Intelligence Analyst", IsDeleted = false }
                );
                context.SaveChanges();
            }

            // ---- Seed Permissions ----
            if (!context.Permissions.Any())
            {
                context.Permissions.AddRange(
                    new Permission { PermissionId = "1", Description = "View_All_Cases", IsDeleted = false },
                    new Permission { PermissionId = "2", Description = "Create_Case", IsDeleted = false },
                    new Permission { PermissionId = "3", Description = "Edit_Case", IsDeleted = false },
                    new Permission { PermissionId = "4", Description = "Delete_Case", IsDeleted = false },
                    new Permission { PermissionId = "5", Description = "Approve_Report", IsDeleted = false },
                    new Permission { PermissionId = "6", Description = "Create_Report", IsDeleted = false },
                    new Permission { PermissionId = "7", Description = "Edit_Report", IsDeleted = false },
                    new Permission { PermissionId = "8", Description = "Delete_Report", IsDeleted = false },
                    new Permission { PermissionId = "9", Description = "Manage_Users", IsDeleted = false },
                    new Permission { PermissionId = "10", Description = "Manage_Roles", IsDeleted = false },
                    new Permission { PermissionId = "11", Description = "Add_Evidence", IsDeleted = false },
                    new Permission { PermissionId = "12", Description = "Analyze_Evidence", IsDeleted = false },
                    new Permission { PermissionId = "13", Description = "Approve_Arrest", IsDeleted = false },
                    new Permission { PermissionId = "14", Description = "Create_Arrest", IsDeleted = false },
                    new Permission { PermissionId = "15", Description = "Manage_Warrants", IsDeleted = false },
                    new Permission { PermissionId = "16", Description = "Conduct_Interview", IsDeleted = false },
                    new Permission { PermissionId = "17", Description = "View_Financial_Records", IsDeleted = false },
                    new Permission { PermissionId = "18", Description = "Manage_Inmates", IsDeleted = false },
                    new Permission { PermissionId = "19", Description = "Access_Forensics_Lab", IsDeleted = false },
                    new Permission { PermissionId = "20", Description = "Manage_Investigation_Plans", IsDeleted = false },
                    new Permission { PermissionId = "21", Description = "View_Sensitive_Data", IsDeleted = false },
                    new Permission { PermissionId = "22", Description = "Issue_Indictment", IsDeleted = false },
                    new Permission { PermissionId = "23", Description = "Approve_Prosecution", IsDeleted = false },
                    new Permission { PermissionId = "24", Description = "Issue_Sentence", IsDeleted = false },
                    new Permission { PermissionId = "25", Description = "Manage_Timeline_Entries", IsDeleted = false },
                    new Permission { PermissionId = "26", Description = "View_Victims", IsDeleted = false },
                    new Permission { PermissionId = "27", Description = "View_Suspects", IsDeleted = false },
                    new Permission { PermissionId = "28", Description = "View_Witnesses", IsDeleted = false },
                    new Permission { PermissionId = "29", Description = "Conduct_Physical_Invest", IsDeleted = false },
                    new Permission { PermissionId = "30", Description = "Conduct_Digital_Invest", IsDeleted = false },
                    new Permission { PermissionId = "31", Description = "Conduct_Financial_Invest", IsDeleted = false },
                    new Permission { PermissionId = "32", Description = "Create_Measure_Survey", IsDeleted = false }
                );
                context.SaveChanges();
            }
            // ---- Seed RolePermission ----
            if (!context.RolePermissions.Any())
            {
                context.RolePermissions.AddRange(
                    new RolePermission { PermissionId = "1", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "2", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "3", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "4", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "5", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "6", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "7", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "8", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "9", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "10", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "11", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "12", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "13", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "14", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "15", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "16", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "17", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "18", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "19", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "20", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "21", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "22", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "23", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "24", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "25", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "26", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "27", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "28", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "29", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "30", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "31", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "32", RoleId = "1", IsDeleted = false },
                    new RolePermission { PermissionId = "1", RoleId = "2", IsDeleted = false },
                    new RolePermission { PermissionId = "6", RoleId = "2", IsDeleted = false },
                    new RolePermission { PermissionId = "7", RoleId = "2", IsDeleted = false },
                    new RolePermission { PermissionId = "11", RoleId = "2", IsDeleted = false },
                    new RolePermission { PermissionId = "14", RoleId = "2", IsDeleted = false },
                    new RolePermission { PermissionId = "26", RoleId = "2", IsDeleted = false },
                    new RolePermission { PermissionId = "27", RoleId = "2", IsDeleted = false },
                    new RolePermission { PermissionId = "28", RoleId = "2", IsDeleted = false },
                    new RolePermission { PermissionId = "1", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "2", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "3", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "7", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "11", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "14", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "15", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "16", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "20", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "26", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "27", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "28", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "29", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "30", RoleId = "3", IsDeleted = false },
                    new RolePermission { PermissionId = "1", RoleId = "4", IsDeleted = false },
                    new RolePermission { PermissionId = "11", RoleId = "4", IsDeleted = false },
                    new RolePermission { PermissionId = "12", RoleId = "4", IsDeleted = false },
                    new RolePermission { PermissionId = "19", RoleId = "4", IsDeleted = false },
                    new RolePermission { PermissionId = "21", RoleId = "4", IsDeleted = false },
                    new RolePermission { PermissionId = "1", RoleId = "5", IsDeleted = false },
                    new RolePermission { PermissionId = "21", RoleId = "5", IsDeleted = false },
                    new RolePermission { PermissionId = "22", RoleId = "5", IsDeleted = false },
                    new RolePermission { PermissionId = "23", RoleId = "5", IsDeleted = false },
                    new RolePermission { PermissionId = "24", RoleId = "5", IsDeleted = false },
                    new RolePermission { PermissionId = "1", RoleId = "6", IsDeleted = false },
                    new RolePermission { PermissionId = "17", RoleId = "6", IsDeleted = false },
                    new RolePermission { PermissionId = "21", RoleId = "6", IsDeleted = false },
                    new RolePermission { PermissionId = "31", RoleId = "6", IsDeleted = false },
                    new RolePermission { PermissionId = "1", RoleId = "7", IsDeleted = false },
                    new RolePermission { PermissionId = "11", RoleId = "7", IsDeleted = false },
                    new RolePermission { PermissionId = "1", RoleId = "8", IsDeleted = false },
                    new RolePermission { PermissionId = "3", RoleId = "8", IsDeleted = false },
                    new RolePermission { PermissionId = "5", RoleId = "8", IsDeleted = false },
                    new RolePermission { PermissionId = "9", RoleId = "8", IsDeleted = false },
                    new RolePermission { PermissionId = "10", RoleId = "8", IsDeleted = false },
                    new RolePermission { PermissionId = "13", RoleId = "8", IsDeleted = false },
                    new RolePermission { PermissionId = "21", RoleId = "8", IsDeleted = false },
                    new RolePermission { PermissionId = "23", RoleId = "8", IsDeleted = false },
                    new RolePermission { PermissionId = "24", RoleId = "8", IsDeleted = false },
                    new RolePermission { PermissionId = "1", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "2", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "3", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "7", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "11", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "14", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "15", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "16", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "20", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "21", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "26", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "27", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "28", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "29", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "30", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "31", RoleId = "9", IsDeleted = false },
                    new RolePermission { PermissionId = "1", RoleId = "10", IsDeleted = false },
                    new RolePermission { PermissionId = "11", RoleId = "10", IsDeleted = false },
                    new RolePermission { PermissionId = "12", RoleId = "10", IsDeleted = false },
                    new RolePermission { PermissionId = "21", RoleId = "10", IsDeleted = false },
                    new RolePermission { PermissionId = "30", RoleId = "10", IsDeleted = false },
                    new RolePermission { PermissionId = "1", RoleId = "11", IsDeleted = false },
                    new RolePermission { PermissionId = "5", RoleId = "11", IsDeleted = false }
                );
                context.SaveChanges();
            }
        }
    }
}
