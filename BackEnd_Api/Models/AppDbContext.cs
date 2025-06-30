using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BackEnd_Api.Models
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<UserCase> UserCases { get; set; }
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<Sentence> Sentences { get; set; }
        public DbSet<Indictment> Indictments { get; set; }
        public DbSet<Victim> Victims { get; set; }
        public DbSet<Prosecution> Prosecutions { get; set; }
        public DbSet<VictimInterview> VictimInterviews { get; set; }
        public DbSet<Case> Cases { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Warrant> Warrants { get; set; }
        public DbSet<WarrantResult> WarrantResults { get; set; }
        public DbSet<CaseEvidence> CaseEvidences { get; set; }
        public DbSet<Evidence> Evidences { get; set; }
        public DbSet<WarrantEvidence> WarrantEvidences { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<InvestigationPlan> InvestigationPlans { get; set; }
        public DbSet<Witness> Witnesses { get; set; }
        public DbSet<CaseResult> CaseResults { get; set; }
        public DbSet<DigitalInvest> DigitalInvests { get; set; }
        public DbSet<ForensicInvest> ForensicInvests { get; set; }
        public DbSet<RecordInfo> RecordInfos { get; set; }
        public DbSet<ReportVictim> ReportVictims { get; set; }
        public DbSet<MeasureSurvey> MeasureSurveys { get; set; }
        public DbSet<ReportSuspect> ReportSuspects { get; set; }
        public DbSet<Suspect> Suspects { get; set; }
        public DbSet<WitnessInterview> WitnessInterviews { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Inmate> Inmates { get; set; }
        public DbSet<FinancialInvest> FinancialInvests { get; set; }
        public DbSet<PhysicalInvest> PhysicalInvests { get; set; }
        public DbSet<Timeline> Timelines { get; set; }
        public DbSet<SuspectEvidence> SuspectEvidences { get; set; }
        public DbSet<ProsecutionSuspect> ProsecutionSuspects { get; set; }
        public DbSet<Arrest> Arrests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Role>()
                .HasKey(r => r.RoleId);
            modelBuilder.Entity<Role>()
                .Property(r => r.RoleId)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Permission>()
                .HasKey(p => p.PermissionId);
            modelBuilder.Entity<Permission>()
                .Property(p => p.PermissionId)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<RolePermission>()
                .HasKey(rp => new { rp.RoleId, rp.PermissionId });
            modelBuilder.Entity<RolePermission>()
                .HasOne(rp => rp.Role)
                .WithMany(r => r.RolePermissions)
                .HasForeignKey(rp => rp.RoleId);
            modelBuilder.Entity<RolePermission>()
                .HasOne(rp => rp.Permission)
                .WithMany(p => p.RolePermissions)
                .HasForeignKey(rp => rp.PermissionId);

            modelBuilder.Entity<UserCase>()
                .HasKey(uc => new { uc.OfficerId, uc.CaseId });
            modelBuilder.Entity<UserCase>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserCases)
                .HasForeignKey(uc => uc.OfficerId);
            modelBuilder.Entity<UserCase>()
                .HasOne(uc => uc.Case)
                .WithMany(c => c.UserCases)
                .HasForeignKey(uc => uc.CaseId);

            modelBuilder.Entity<Interview>()
                .HasKey(i => i.InterviewId);
            modelBuilder.Entity<Interview>()
                .HasOne(i => i.InvestigationPlan)
                .WithMany(ip => ip.Interviews)
                .HasForeignKey(i => i.InvestigationPlanId);
            modelBuilder.Entity<Interview>()
                .HasOne(i => i.Interviewer)
                .WithMany(u => u.Interviews)
                .HasForeignKey(i => i.InterviewerId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Interview>()
                .HasOne(i => i.Interviewee)
                .WithMany()
                .HasForeignKey(i => i.IntervieweeId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Sentence>()
                .HasKey(s => s.SentenceId);
            modelBuilder.Entity<Sentence>()
                .HasOne(s => s.Case)
                .WithMany(c => c.Sentences)
                .HasForeignKey(s => s.CaseId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Sentence>()
                .HasOne(s => s.CaseResult)
                .WithMany(cr => cr.Sentences)
                .HasForeignKey(s => s.CaseResultId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Indictment>()
                .HasKey(i => i.IndictmentId);
            modelBuilder.Entity<Indictment>()
                .HasOne(i => i.Prosecution)
                .WithMany(p => p.Indictments)
                .HasForeignKey(i => i.ProsecutionId);

            modelBuilder.Entity<Victim>()
                .HasKey(v => v.VictimId);
            modelBuilder.Entity<Victim>()
                .HasOne(v => v.Case)
                .WithMany(c => c.Victims)
                .HasForeignKey(v => v.CaseId);

            modelBuilder.Entity<Prosecution>()
                .HasKey(p => p.ProsecutionId);
            modelBuilder.Entity<Prosecution>()
                .HasOne(p => p.Case)
                .WithMany(c => c.Prosecutions)
                .HasForeignKey(p => p.CaseId);
            modelBuilder.Entity<Prosecution>()
                .HasOne(p => p.Prosecutor)
                .WithMany(u => u.Prosecutions)
                .HasForeignKey(p => p.ProsecutorId);

            modelBuilder.Entity<VictimInterview>()
                .HasKey(vi => new { vi.VictimId, vi.InterviewId });
            modelBuilder.Entity<VictimInterview>()
                .HasOne(vi => vi.Victim)
                .WithMany(v => v.VictimInterviews)
                .HasForeignKey(vi => vi.VictimId);
            modelBuilder.Entity<VictimInterview>()
                .HasOne(vi => vi.Interview)
                .WithMany(i => i.VictimInterviews)
                .HasForeignKey(vi => vi.InterviewId);

            modelBuilder.Entity<Case>()
                .HasKey(c => c.CaseId);

            modelBuilder.Entity<Question>()
                .HasKey(q => q.QuestionId);
            modelBuilder.Entity<Question>()
                .HasOne(q => q.Interview)
                .WithMany(i => i.Questions)
                .HasForeignKey(q => q.InterviewId);
            modelBuilder.Entity<Question>()
                .HasOne(q => q.CreatedByUser)
                .WithMany(u => u.Questions)
                .HasForeignKey(q => q.CreatedBy);

            modelBuilder.Entity<Warrant>()
                .HasKey(w => w.WarrantId);
            modelBuilder.Entity<Warrant>()
                .HasOne(w => w.Case)
                .WithMany(c => c.Warrants)
                .HasForeignKey(w => w.CaseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WarrantResult>()
                .HasKey(wr => wr.WarrantResultId);
            modelBuilder.Entity<WarrantResult>()
                .HasOne(wr => wr.Warrant)
                .WithMany(w => w.WarrantResults)
                .HasForeignKey(wr => wr.WarrantId);

            modelBuilder.Entity<CaseEvidence>()
                .HasKey(ce => new { ce.CaseId, ce.EvidenceId });
            modelBuilder.Entity<CaseEvidence>()
                .HasOne(ce => ce.Case)
                .WithMany(c => c.CaseEvidences)
                .HasForeignKey(ce => ce.CaseId);
            modelBuilder.Entity<CaseEvidence>()
                .HasOne(ce => ce.Evidence)
                .WithMany(e => e.CaseEvidences)
                .HasForeignKey(ce => ce.EvidenceId);

            modelBuilder.Entity<Evidence>()
                .HasKey(e => e.EvidenceId);
            modelBuilder.Entity<Evidence>()
                .HasOne(e => e.CollectedByUser)
                .WithMany(u => u.EvidencesCollected)
                .HasForeignKey(e => e.CollectedBy);

            modelBuilder.Entity<WarrantEvidence>()
                .HasKey(we => new { we.WarrantId, we.EvidenceId });
            modelBuilder.Entity<WarrantEvidence>()
                .HasOne(we => we.Warrant)
                .WithMany(w => w.WarrantEvidences)
                .HasForeignKey(we => we.WarrantId);
            modelBuilder.Entity<WarrantEvidence>()
                .HasOne(we => we.Evidence)
                .WithMany(e => e.WarrantEvidences)
                .HasForeignKey(we => we.EvidenceId);

            modelBuilder.Entity<Report>()
                .HasKey(r => r.ReportId);
            modelBuilder.Entity<Report>()
                .HasOne(r => r.OfficerApprove)
                .WithMany(u => u.ReportsApproved)
                .HasForeignKey(r => r.OfficerApproveId);

            modelBuilder.Entity<InvestigationPlan>()
                .HasKey(ip => ip.InvestigationPlanId);
            modelBuilder.Entity<InvestigationPlan>()
                .HasOne(ip => ip.CreatedOfficer)
                .WithMany(u => u.InvestigationPlans)
                .HasForeignKey(ip => ip.CreatedOfficerId);
            modelBuilder.Entity<InvestigationPlan>()
                .HasOne(ip => ip.Case)
                .WithMany(c => c.InvestigationPlans)
                .HasForeignKey(ip => ip.CaseId);

            modelBuilder.Entity<Witness>()
                .HasKey(w => w.WitnessId);
            modelBuilder.Entity<Witness>()
                .HasOne(w => w.Case)
                .WithMany(c => c.Witnesses)
                .HasForeignKey(w => w.CaseId);

            modelBuilder.Entity<CaseResult>()
                .HasKey(cr => cr.CaseResultId);
            modelBuilder.Entity<CaseResult>()
                .HasOne(cr => cr.Case)
                .WithMany(c => c.CaseResults)
                .HasForeignKey(cr => cr.CaseId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<DigitalInvest>()
                .HasKey(di => di.EvidenceId);
            modelBuilder.Entity<DigitalInvest>()
                .HasOne(di => di.Evidence)
                .WithOne(e => e.DigitalInvest)
                .HasForeignKey<DigitalInvest>(di => di.EvidenceId);

            modelBuilder.Entity<ForensicInvest>()
                .HasKey(fi => fi.EvidenceId);
            modelBuilder.Entity<ForensicInvest>()
                .HasOne(fi => fi.Evidence)
                .WithOne(e => e.ForensicInvest)
                .HasForeignKey<ForensicInvest>(fi => fi.EvidenceId);

            modelBuilder.Entity<RecordInfo>()
                .HasKey(ri => ri.RecordInfoId);
            modelBuilder.Entity<RecordInfo>()
                .HasOne(ri => ri.Evidence)
                .WithMany(e => e.RecordInfos)
                .HasForeignKey(ri => ri.EvidenceId);

            modelBuilder.Entity<ReportVictim>()
                .HasKey(rv => new { rv.ReportId, rv.VictimId });
            modelBuilder.Entity<ReportVictim>()
                .HasOne(rv => rv.Report)
                .WithMany(r => r.ReportVictims)
                .HasForeignKey(rv => rv.ReportId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ReportVictim>()
                .HasOne(rv => rv.Victim)
                .WithMany(v => v.ReportVictims)
                .HasForeignKey(rv => rv.VictimId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<MeasureSurvey>()
                .HasKey(ms => ms.MeasureSurveyId);

            modelBuilder.Entity<ReportSuspect>()
                .HasKey(rs => new { rs.ReportId, rs.SuspectId });
            modelBuilder.Entity<ReportSuspect>()
                .HasOne(rs => rs.Report)
                .WithMany(r => r.ReportSuspects)
                .HasForeignKey(rs => rs.ReportId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ReportSuspect>()
                .HasOne(rs => rs.Suspect)
                .WithMany(s => s.ReportSuspects)
                .HasForeignKey(rs => rs.SuspectId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Suspect>()
                .HasKey(s => s.SuspectId);
            modelBuilder.Entity<Suspect>()
                .HasOne(s => s.Case)
                .WithMany(c => c.Suspects)
                .HasForeignKey(s => s.CaseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WitnessInterview>()
                .HasKey(wi => new { wi.WitnessId, wi.InterviewId });
            modelBuilder.Entity<WitnessInterview>()
                .HasOne(wi => wi.Witness)
                .WithMany(w => w.WitnessInterviews)
                .HasForeignKey(wi => wi.WitnessId);
            modelBuilder.Entity<WitnessInterview>()
                .HasOne(wi => wi.Interview)
                .WithMany(i => i.WitnessInterviews)
                .HasForeignKey(wi => wi.InterviewId);

            modelBuilder.Entity<Event>()
                .HasKey(e => e.EventId);
            modelBuilder.Entity<Event>()
                .HasOne(e => e.Suspect)
                .WithMany(s => s.Events)
                .HasForeignKey(e => e.SuspectId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Event>()
                .HasOne(e => e.Case)
                .WithMany(c => c.Events)
                .HasForeignKey(e => e.CaseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Inmate>()
                .HasKey(i => i.InmateId);
            modelBuilder.Entity<Inmate>()
                .HasOne(i => i.Sentence)
                .WithMany(s => s.Inmates)
                .HasForeignKey(i => i.SentenceId);

            modelBuilder.Entity<FinancialInvest>()
                .HasKey(fi => fi.EvidenceId);
            modelBuilder.Entity<FinancialInvest>()
                .HasOne(fi => fi.Evidence)
                .WithOne(e => e.FinancialInvest)
                .HasForeignKey<FinancialInvest>(fi => fi.EvidenceId);

            modelBuilder.Entity<PhysicalInvest>()
                .HasKey(pi => pi.EvidenceId);
            modelBuilder.Entity<PhysicalInvest>()
                .HasOne(pi => pi.Evidence)
                .WithOne(e => e.PhysicalInvest)
                .HasForeignKey<PhysicalInvest>(pi => pi.EvidenceId);

            modelBuilder.Entity<Timeline>()
                .HasKey(t => t.TimelineId);
            modelBuilder.Entity<Timeline>()
                .HasOne(t => t.CaseResult)
                .WithMany(cr => cr.Timelines)
                .HasForeignKey(t => t.CaseResultId);

            modelBuilder.Entity<SuspectEvidence>()
                .HasKey(se => new { se.SuspectId, se.EvidenceId });
            modelBuilder.Entity<SuspectEvidence>()
                .HasOne(se => se.Suspect)
                .WithMany(s => s.SuspectEvidences)
                .HasForeignKey(se => se.SuspectId);
            modelBuilder.Entity<SuspectEvidence>()
                .HasOne(se => se.Evidence)
                .WithMany(e => e.SuspectEvidences)
                .HasForeignKey(se => se.EvidenceId);

            modelBuilder.Entity<ProsecutionSuspect>()
                .HasKey(ps => new { ps.ProsecutionId, ps.SuspectId });
            modelBuilder.Entity<ProsecutionSuspect>()
                .HasOne(ps => ps.Prosecution)
                .WithMany(p => p.ProsecutionSuspects)
                .HasForeignKey(ps => ps.ProsecutionId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ProsecutionSuspect>()
                .HasOne(ps => ps.Suspect)
                .WithMany(s => s.ProsecutionSuspects)
                .HasForeignKey(ps => ps.SuspectId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Arrest>()
                .HasKey(a => new { a.SuspectId, a.CaseId });
            modelBuilder.Entity<Arrest>()
                .HasOne(a => a.Suspect)
                .WithMany(s => s.Arrests)
                .HasForeignKey(a => a.SuspectId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Arrest>()
                .HasOne(a => a.Case)
                .WithMany(c => c.Arrests)
                .HasForeignKey(a => a.CaseId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Arrest>()
                .HasOne(a => a.Officer)
                .WithMany(u => u.Arrests)
                .HasForeignKey(a => a.OfficerId);
        }

    }
}