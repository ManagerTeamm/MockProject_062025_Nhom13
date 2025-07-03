using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Linq.Expressions;
using System;

namespace BackEnd_Api.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<UserCase> UserCases { get; set; }
        public DbSet<Interview> Interviews { get; set; }
        public DbSet<Sentence> Sentences { get; set; }
        public DbSet<Indictment> Indictments { get; set; }
        public DbSet<Victim> Victims { get; set; }
        public DbSet<Prosecution> Prosecutions { get; set; }
        public DbSet<ReportWitness> ReportWitness { get; set; }
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
        public DbSet<SceneDescription> SceneDescriptions { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Inmate> Inmates { get; set; }
        public DbSet<FinancialInvest> FinancialInvests { get; set; }
        public DbSet<PhysicalInvest> PhysicalInvests { get; set; }
        public DbSet<Timeline> Timelines { get; set; }
        public DbSet<SuspectEvidence> SuspectEvidences { get; set; }
        public DbSet<ProsecutionSuspect> ProsecutionSuspects { get; set; }
        public DbSet<Arrest> Arrests { get; set; }
        public DbSet<SceneMedia> SceneMedias { get; set; }
        public DbSet<SceneProtection> SceneProtections { get; set; }
        public DbSet<SceneSuport> SceneSuports { get; set; }    
        public DbSet<VictimEvidence> VictimEvidences { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasQueryFilter(u => !u.IsDeleted);

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
                .HasOne(a => a.User)
                .WithMany(u => u.Arrests)
                .HasForeignKey(a => a.OfficerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Case>()
                .HasKey(c => c.CaseId);

            modelBuilder.Entity<CaseEvidence>()
                .HasKey(ce => new { ce.CaseId, ce.EvidenceId });
            modelBuilder.Entity<CaseEvidence>()
                .HasOne(ce => ce.Case)
                .WithMany(c => c.CaseEvidences)
                .HasForeignKey(ce => ce.CaseId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<CaseEvidence>()
                .HasOne(ce => ce.Evidence)
                .WithMany(e => e.CaseEvidences)
                .HasForeignKey(ce => ce.EvidenceId)
                .OnDelete(DeleteBehavior.Restrict);

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
                .HasForeignKey<DigitalInvest>(di => di.EvidenceId)
                .OnDelete(DeleteBehavior.Restrict);

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

            modelBuilder.Entity<Evidence>()
                .HasKey(e => e.EvidenceId);
            modelBuilder.Entity<Evidence>()
                .HasOne(e => e.User)
                .WithMany(u => u.Evidences)
                .HasForeignKey(e => e.CollectedBy)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Evidence>()
                .HasOne(e => e.MeasureSurvey)
                .WithMany(ms => ms.Evidences)
                .HasForeignKey(e => e.MeasureSurveyId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Evidence>()
                .HasOne(e => e.WarrantResult)
                .WithMany(wr => wr.Evidences)
                .HasForeignKey(e => e.WarrantResultId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Evidence>()
                .HasOne(e => e.Report)
                .WithMany(r => r.Evidences)
                .HasForeignKey(e => e.ReportId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FinancialInvest>()
                .HasKey(fi => fi.EvidenceId);
            modelBuilder.Entity<FinancialInvest>()
                .HasOne(fi => fi.Evidence)
                .WithOne(e => e.FinancialInvest)
                .HasForeignKey<FinancialInvest>(fi => fi.EvidenceId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ForensicInvest>()
                .HasKey(fi => fi.EvidenceId);
            modelBuilder.Entity<ForensicInvest>()
                .HasOne(fi => fi.Evidence)
                .WithOne(e => e.ForensicInvest)
                .HasForeignKey<ForensicInvest>(fi => fi.EvidenceId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Indictment>()
                .HasKey(i => i.IndictmentId);
            modelBuilder.Entity<Indictment>()
                .HasOne(i => i.Prosecution)
                .WithMany(p => p.Indictments)
                .HasForeignKey(i => i.ProsecutionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Inmate>()
                .HasKey(i => i.InmateId);
            modelBuilder.Entity<Inmate>()
                .HasOne(i => i.Sentence)
                .WithMany(s => s.Inmates)
                .HasForeignKey(i => i.SentenceId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Interview>()
                .HasKey(i => i.InterviewId);
            modelBuilder.Entity<Interview>()
                .HasOne(i => i.InvestigationPlan)
                .WithMany(p => p.Interviews)
                .HasForeignKey(i => i.InvestigationPlanId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Interview>()
                .HasOne(i => i.User)
                .WithMany(u => u.Interviews)
                .HasForeignKey(i => i.InterviewerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<InvestigationPlan>()
                .HasKey(ip => ip.InvestigationPlanId);
            modelBuilder.Entity<InvestigationPlan>()
                .HasOne(ip => ip.CreatedOfficer)
                .WithMany(u => u.InvestigationPlans)
                .HasForeignKey(ip => ip.CreatedOfficerId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<InvestigationPlan>()
                .HasOne(ip => ip.Case)
                .WithMany(c => c.InvestigationPlans)
                .HasForeignKey(ip => ip.CaseId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MeasureSurvey>()
                .HasKey(ms => ms.MeasureSurveyId);

            modelBuilder.Entity<Permission>()
                .HasKey(p => p.PermissionId);

            modelBuilder.Entity<PhysicalInvest>()
                .HasKey(pi => pi.EvidenceId);
            modelBuilder.Entity<PhysicalInvest>()
                .HasOne(pi => pi.Evidence)
                .WithOne(e => e.PhysicalInvest)
                .HasForeignKey<PhysicalInvest>(pi => pi.EvidenceId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Prosecution>()
                .HasKey(p => p.ProsecutionId);
            modelBuilder.Entity<Prosecution>()
                .HasOne(p => p.Case)
                .WithMany(c => c.Prosecutions)
                .HasForeignKey(p => p.CaseId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Prosecution>()
                .HasOne(p => p.Prosecutor)
                .WithMany(u => u.Prosecutions)
                .HasForeignKey(p => p.ProsecutorId)
                .OnDelete(DeleteBehavior.Restrict);

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

            modelBuilder.Entity<Question>()
                .HasKey(q => q.QuestionId);
            modelBuilder.Entity<Question>()
                .HasOne(q => q.Interview)
                .WithMany(i => i.Questions)
                .HasForeignKey(q => q.InterviewId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Question>()
                .HasOne(q => q.User)
                .WithMany(u => u.Questions)
                .HasForeignKey(q => q.CreatedBy)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RecordInfo>()
                .HasKey(ri => ri.RecordInfoId);
            modelBuilder.Entity<RecordInfo>()
                .HasOne(ri => ri.Evidence)
                .WithMany(e => e.RecordInfos)
                .HasForeignKey(ri => ri.EvidenceId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Report>()
                .HasKey(r => r.ReportId);
            modelBuilder.Entity<Report>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reports)
                .HasForeignKey(r => r.OfficerApproveId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Report>()
                .HasOne(r => r.Case)
                .WithMany(c => c.Reports)
                .HasForeignKey(r => r.CaseId)
                .OnDelete(DeleteBehavior.Cascade);

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

            modelBuilder.Entity<ReportWitness>()
                .HasKey(rv => new { rv.ReportId, rv.WitnessId });
            modelBuilder.Entity<ReportWitness>()
                .HasOne(rv => rv.Report)
                .WithMany(r => r.ReportWitness)
                .HasForeignKey(rv => rv.ReportId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ReportWitness>()
                .HasOne(rv => rv.Witness)
                .WithMany(v => v.ReportWitness)
                .HasForeignKey(rv => rv.WitnessId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Role>()
                .HasKey(r => r.RoleId);

            modelBuilder.Entity<RolePermission>()
                .HasKey(rp => new { rp.RoleId, rp.PermissionId });
            modelBuilder.Entity<RolePermission>()
                .HasOne(rp => rp.Role)
                .WithMany(r => r.RolePermissions)
                .HasForeignKey(rp => rp.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<RolePermission>()
                .HasOne(rp => rp.Permission)
                .WithMany(p => p.RolePermissions)
                .HasForeignKey(rp => rp.PermissionId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SceneDescription>()
                .HasKey(sd => sd.SceneDescriptionId);
            modelBuilder.Entity<SceneDescription>()
                .HasOne(sd => sd.Case)
                .WithMany(c => c.SceneDescription)
                .HasForeignKey(sd => sd.CaseId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<SceneDescription>()
                .HasOne(sd => sd.User)
                .WithMany(u => u.SceneDescriptions)
                .HasForeignKey(sd => sd.Provider)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SceneMedia>()
                .HasKey(sm => sm.SceneMediaId);
            modelBuilder.Entity<SceneMedia>()
                .HasOne(sm => sm.Case)
                .WithMany(c => c.SceneMedia)
                .HasForeignKey(sm => sm.CaseId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<SceneMedia>()
                .HasOne(sm => sm.User)
                .WithMany(u => u.SceneMedias)
                .HasForeignKey(sm => sm.CapturedBy)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SceneProtection>()
                .HasKey(sp => sp.SceneProtectionId);
            modelBuilder.Entity<SceneProtection>()
                .HasOne(sp => sp.Case)
                .WithMany(c => c.SceneProtections)
                .HasForeignKey(sp => sp.CaseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SceneSuport>()
                .HasKey(ss => ss.SceneSuportId);
            modelBuilder.Entity<SceneSuport>()
                .HasOne(ss => ss.Case)
                .WithMany(c => c.SceneSuports)
                .HasForeignKey(ss => ss.CaseId)
                .OnDelete(DeleteBehavior.Cascade);

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

            modelBuilder.Entity<Suspect>()
                .HasKey(s => s.SuspectId);
            modelBuilder.Entity<Suspect>()
                .HasOne(s => s.Case)
                .WithMany(c => c.Suspects)
                .HasForeignKey(s => s.CaseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SuspectEvidence>()
                .HasKey(se => new { se.SuspectId, se.EvidenceId });
            modelBuilder.Entity<SuspectEvidence>()
                .HasOne(se => se.Suspect)
                .WithMany(s => s.SuspectEvidences)
                .HasForeignKey(se => se.SuspectId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<SuspectEvidence>()
                .HasOne(se => se.Evidence)
                .WithMany(e => e.SuspectEvidences)
                .HasForeignKey(se => se.EvidenceId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Timeline>()
                .HasKey(t => t.TimelineId);
            modelBuilder.Entity<Timeline>()
                .HasOne(t => t.CaseResult)
                .WithMany(cr => cr.Timelines)
                .HasForeignKey(t => t.CaseResultId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasKey(u => u.UserName);
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserCase>()
                .HasKey(uc => new { uc.OfficerId, uc.CaseId });
            modelBuilder.Entity<UserCase>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserCases)
                .HasForeignKey(uc => uc.OfficerId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<UserCase>()
                .HasOne(uc => uc.Case)
                .WithMany(c => c.UserCases)
                .HasForeignKey(uc => uc.CaseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Victim>()
                .HasKey(v => v.VictimId);
            modelBuilder.Entity<Victim>()
                .HasOne(v => v.Case)
                .WithMany(c => c.Victims)
                .HasForeignKey(v => v.CaseId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<VictimEvidence>()
                .HasKey(ve => new { ve.VictimId, ve.EvidenceId });
            modelBuilder.Entity<VictimEvidence>()
                .HasOne(ve => ve.Victim)
                .WithMany(v => v.VictimEvidences)
                .HasForeignKey(ve => ve.VictimId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<VictimEvidence>()
                .HasOne(ve => ve.Evidence)
                .WithMany(e => e.VictimEvidences)
                .HasForeignKey(ve => ve.EvidenceId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Warrant>()
                .HasKey(w => w.WarrantId);
            modelBuilder.Entity<Warrant>()
                .HasOne(w => w.Case)
                .WithMany(c => c.Warrants)
                .HasForeignKey(w => w.CaseId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Warrant>()
                .HasOne(w => w.User)
                .WithMany(u => u.Warrants)
                .HasForeignKey(w => w.PoliceReponse)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<WarrantEvidence>()
                .HasKey(we => new { we.WarrantId, we.EvidenceId });
            modelBuilder.Entity<WarrantEvidence>()
                .HasOne(we => we.Warrant)
                .WithMany(w => w.WarrantEvidences)
                .HasForeignKey(we => we.WarrantId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<WarrantEvidence>()
                .HasOne(we => we.Evidence)
                .WithMany(e => e.WarrantEvidences)
                .HasForeignKey(we => we.EvidenceId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<WarrantResult>()
                .HasKey(wr => wr.WarrantResultId);
            modelBuilder.Entity<WarrantResult>()
                .HasOne(wr => wr.Warrant)
                .WithMany(w => w.WarrantResults)
                .HasForeignKey(wr => wr.WarrantId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<WarrantResult>()
                .HasOne(wr => wr.User)
                .WithMany(u => u.WarrantResults)
                .HasForeignKey(wr => wr.PoliceResponse)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Witness>()
                .HasKey(w => w.WitnessId);
            modelBuilder.Entity<Witness>()
                .HasOne(w => w.Case)
                .WithMany(c => c.Witnesses)
                .HasForeignKey(w => w.CaseId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}