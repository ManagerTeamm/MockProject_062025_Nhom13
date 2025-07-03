using BackEnd_Api.Helpers;
using BackEnd_Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackEnd_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Report Approver")]
    public class ReportController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ReportController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("get-reports")]
        public async Task<IActionResult> GetReports()
        {
            try
            {
                var reports = await _context.Reports.ToListAsync();

                var response = ApiResponseHelper<List<Report>>.SuccessResult(reports, "Get reports completed");

                return Ok(response);
            }
            catch (Exception e)
            {
                var response = ApiResponseHelper<string>.FailureResult("Error when find reports", new[] { e.Message }, 500);
                return StatusCode(500, response);
            }
        }
        [HttpPost("insert-sample")]
        public async Task<IActionResult> InsertSampleReports()
        {
            try
            {
                var sampleReports = new List<Report>
                {
                    new Report
                    {
                        ReportId = Guid.NewGuid().ToString(),
                        CaseId = null, // hoặc "CASE001" nếu bạn có CaseId tồn tại
                        TypeReport = "Witness Statement",
                        Severity = "Medium",
                        Description = "Witness saw suspect near crime scene.",
                        CaseLocation = "District 1",
                        ReportedAt = DateTime.Now,
                        ReporterFullname = "Nguyen Van A",
                        ReporterEmail = "a@example.com",
                        ReporterPhoneNumber = "0901000001",
                        OfficerApproveId = "Huy0307",
                        IsDeleted = false
                    }

                };

                await _context.Reports.AddRangeAsync(sampleReports);
                await _context.SaveChangesAsync();

                var response = ApiResponseHelper<string>.SuccessResult(null, "Inserted 5 sample reports successfully");
                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = ApiResponseHelper<string>.FailureResult("Failed to insert sample reports", new[] { ex.Message }, 500);
                return StatusCode(500, response);
            }
        }
        [HttpGet("/report-detail/{id}")]
        public async Task<IActionResult> GetReportDetail(string id)
        {
            try
            {
                var reportDetail = await _context.Reports
                                 .Include(r => r.ReportVictims)
                                     .ThenInclude(rv => rv.Victim)
                                 .Include(r => r.ReportWitness)
                                     .ThenInclude(rw => rw.Witness)
                                 .Include(r => r.ReportSuspects)
                                     .ThenInclude(rs => rs.Suspect)
                                 .Include(r => r.Case)
                                 .FirstOrDefaultAsync(r => r.ReportId == id);
                if(reportDetail == null)
                {
                    var notFoundResponse = ApiResponseHelper<string>.FailureResult("Report not found", new[] { $"No report found with ID: {id}" }, 404);
                    return NotFound(notFoundResponse);
                }
                var response = ApiResponseHelper<Report>.SuccessResult(reportDetail);
                return Ok(response);
            }
            catch(Exception e)
            {
                var response = ApiResponseHelper<string>.FailureResult("Failed to found  sample reports", new[] { e.Message }, 500);
                return StatusCode(500, response);
            }
        }
    }
}

