using Azure;
using BackEnd_Api.Helpers;
using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using System.Linq.Expressions;

namespace BackEnd_Api.Repositories
{
    public class ReportReponsitory : Repository<Report>, IReportRepositoty
    {
        public ReportReponsitory(ApplicationDbContext context) : base(context){}

        public ApiResponseHelper<Report> GetReportDetail(string id)
        {
            try
            {
                var reportDetaill = 
            }
            catch (Exception e)
            {

            }
        }
    }
}
