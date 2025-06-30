namespace BackEnd_Api.Models
{
    public class MeasureSurvey
    {
        public int MeasureSurveyId { get; set; }
        public string TypeName { get; set; }
        public string Source { get; set; }
        public string Result { get; set; }
        public bool IsDeleted { get; set; }
    }
}
