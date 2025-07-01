namespace BackEnd_Api.Models
{
    public class Witness
    {
        public string WitnessId { get; set; }
        public string CaseId { get; set; }
        public Case Case { get; set; }
        public string Fullname { get; set; }
        public string Contact { get; set; }
        public string Statement { get; set; }
        public bool IsDeleted { get; set; }
        public ICollection<ReportWitness> ReportWitness { get; set; }
    }
}
