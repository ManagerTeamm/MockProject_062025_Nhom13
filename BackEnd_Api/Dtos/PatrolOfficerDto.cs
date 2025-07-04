namespace BackEnd_Api.Dtos
{
    public class PatrolOfficerDto
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string PresentStatus { get; set; }
        public string Role { get; set; }
        public string PhoneNumber { get; set; }
        public string Zone { get; set; }
        public class PaginatedResult<T>
        {
            public IEnumerable<T> Items { get; set; }
            public int TotalCount { get; set; }
            public int PageNumber { get; set; }
            public int PageSize { get; set; }
            public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
        }
    }
}
