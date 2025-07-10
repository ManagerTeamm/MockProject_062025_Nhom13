using System;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.ComponentModel.DataAnnotations;

namespace BackEnd_Api.Dtos
{
    public class SuspectDto
    {
        public string CaseId { get; set; }
        public string SuspectId { get; set; }
        public string? Fullname { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? Status { get; set; }
        public DateTime? CatchTime { get; set; }
    }
    public class CreateSuspectDto
    {
        [Required]
        [RegularExpression(@"^S\d{3}$", ErrorMessage = "SuspectId phải có định dạng S###.")]
        public string SuspectId { get; set; }

        [Required]
        public string CaseId { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        [RegularExpression(@"^[A-Za-zÀ-ỹ\s]+$", ErrorMessage = "Fullname chỉ chứa chữ cái và khoảng trắng.")]
        public string Fullname { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [CustomValidation(typeof(CreateSuspectDto), nameof(ValidateDob))]
        public DateTime Dob { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Nationality { get; set; }

        [Required]
        [RegularExpression(@"^\d{9,12}$", ErrorMessage = "Identification phải có 9-12 số.")]
        public string Identification { get; set; }

        [Required]
        [CustomValidation(typeof(CreateSuspectDto), nameof(ValidateCatchTime))]
        public DateTime CatchTime { get; set; }

        [Required]
        public string Status { get; set; }

        public string? Address { get; set; }
        public string? Description { get; set; }
        [RegularExpression(@"^(\+84|0)\d{9}$", ErrorMessage = "Số điện thoại không hợp lệ.")]
        public string? PhoneNumber { get; set; }
        public string? MugshotUrl { get; set; }
        public string? FingerprintHash { get; set; }
        public string? HealthStatus { get; set; }

        public static ValidationResult ValidateDob(DateTime dob, ValidationContext context)
        {
            if (dob == default) return new ValidationResult("Ngày sinh không hợp lệ.");
            var age = DateTime.Now.Year - dob.Year;
            if (dob > DateTime.Now.AddYears(-age)) age--;
            return age >= 14 ? ValidationResult.Success : new ValidationResult("Tuổi phải từ 14 trở lên.");
        }
        public static ValidationResult ValidateCatchTime(DateTime catchTime, ValidationContext context)
        {
            if (catchTime > DateTime.Now)
                return new ValidationResult("Catch Time phải trước thời gian hiện tại.");
            return ValidationResult.Success;
        }
    }
} 