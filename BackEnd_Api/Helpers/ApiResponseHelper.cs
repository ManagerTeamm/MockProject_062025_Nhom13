namespace BackEnd_Api.Helpers
{
    public class ApiResponseHelper<T>
    {
        public bool Success { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
        public IEnumerable<string> Errors { get; set; } = new List<string>();

        // Static methods for convenience
        public static ApiResponseHelper<T> SuccessResult(T data, string message = "Operation completed successfully", int statusCode = 200)
        {
            return new ApiResponseHelper<T>
            {
                Success = true,
                StatusCode = statusCode,
                Message = message,
                Data = data,
                Errors = new List<string>()
            };
        }

        public static ApiResponseHelper<T> FailureResult(string message, IEnumerable<string>? errors = null, int statusCode = 400)
        {
            return new ApiResponseHelper<T>
            {
                Success = false,
                StatusCode = statusCode,
                Message = message,
                Data = default(T),
                Errors = errors ?? new List<string>()
            };
        }

        public static ApiResponseHelper<T> NotFoundResult(string message = "Resource not found")
        {
            return new ApiResponseHelper<T>
            {
                Success = false,
                StatusCode = 404,
                Message = message,
                Data = default(T),
                Errors = new List<string>()
            };
        }

        public static ApiResponseHelper<T> UnauthorizedResult(string message = "Authentication required")
        {
            return new ApiResponseHelper<T>
            {
                Success = false,
                StatusCode = 401,
                Message = message,
                Data = default(T),
                Errors = new List<string>()
            };
        }

        public static ApiResponseHelper<T> ForbiddenResult(string message = "Access denied")
        {
            return new ApiResponseHelper<T>
            {
                Success = false,
                StatusCode = 403,
                Message = message,
                Data = default(T),
                Errors = new List<string>()
            };
        }

        public static ApiResponseHelper<T> ConflictResult(string message = "Resource conflict")
        {
            return new ApiResponseHelper<T>
            {
                Success = false,
                StatusCode = 409,
                Message = message,
                Data = default(T),
                Errors = new List<string>()
            };
        }
    }
}

