using BackEnd_Api.Repositories.Interfaces;

namespace BackEnd_Api.Models
{
    public class Holiday : ISoftDeletable
    {
        public string HolidayName { get; set; }
        public string Description { get; set; }
        public string TypeOfHoliday { get; set; }
        public DateTime HolidayDate { get; set; }
        public bool IsRecurring { get; set; }
        public bool IsDeleted { get; set; }
    }
}
