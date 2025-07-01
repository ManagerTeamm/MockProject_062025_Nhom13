using BackEnd_Api.Models;

public class ReportSeeder
{
    public static void SeedReports(ApplicationDbContext context)
    {
        if (!context.Reports.Any())
        {
            var reports = new List<Report>
            {
                new Report
                {
                    ReportId = Guid.NewGuid().ToString(),
                    CaseId = null, // ✅ NULL ở đây
                    TypeReport = "Witness Statement",
                    Severity = "Medium",
                    Description = "No linked case for now.",
                    CaseLocation = "District 1",
                    ReportedAt = DateTime.Now,
                    ReporterFullname = "Nguyen Van A",
                    ReporterEmail = "a@example.com",
                    ReporterPhoneNumber = "0901000001",
                    OfficerApproveId = "Huy0307", // đảm bảo UserName này tồn tại
                    IsDeleted = false
                },
                // Thêm 4–5 dòng nữa tùy ý
                new Report
                {
                    ReportId = Guid.NewGuid().ToString(),
                    CaseId = null,
                    TypeReport = "Crime Alert",
                    Severity = "High",
                    Description = "Urgent report without case.",
                    CaseLocation = "District 5",
                    ReportedAt = DateTime.Now,
                    ReporterFullname = "Le Thi B",
                    ReporterEmail = "b@example.com",
                    ReporterPhoneNumber = "0901000002",
                    OfficerApproveId = "Nhan2712",
                    IsDeleted = false
                }
            };

            context.Reports.AddRange(reports);
            context.SaveChanges();
        }
    }
}
