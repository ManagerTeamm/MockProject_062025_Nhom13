using BackEnd_Api.Helpers;
using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
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
        private readonly IReportRepositoty _reportRepositoty;
        private readonly IUserRepository _userRepository;
        public ReportController(ApplicationDbContext context,
                                IReportRepositoty reportRepositoty,
                                IUserRepository userRepository)
        {
            _context = context;
            _reportRepositoty = reportRepositoty;
            _userRepository = userRepository;
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

        [HttpGet("report-detail/{id}")]
        public async Task<IActionResult> GetReportDetail(string id)
        {
            try
            {
                if (id != null)
                {
                    //var userPermissions = _userRepository.GetPermissions();
                    //if (!userPermissions.Contains("Manage_Users"))
                    //    return Forbid("You do not have permission to view users.");

                    var reportDetail = await _reportRepositoty.GetReportDetail(id);

                    if (reportDetail == null)
                    {
                        return NotFound(ApiResponseHelper<string>.NotFoundResult("Not found report id = " + id));
                    }

                    var response = ApiResponseHelper<object>.SuccessResult(reportDetail);

                    return Ok(response);
                }
                return NotFound(ApiResponseHelper<string>.NotFoundResult("Not found report id = " + id));
            }
            catch(Exception e)
            {
                return StatusCode(500, ApiResponseHelper<string>.FailureResult("Fail Exception", new[] {e.Message}, 500));
            }
        }
    }
}

