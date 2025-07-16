using BackEnd_Api.Models;
using BackEnd_Api.Repositories.Interfaces;
using BackEnd_Api.Services.Interface;
using Microsoft.EntityFrameworkCore.Storage;
using System;

namespace BackEnd_Api.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        private IDbContextTransaction _transaction;

        public ICaseRepository CaseRepository { get; }

        public IEvidenceRepository EvidenceRepository { get; }

        public IInitialResponseRepository InitialResponseRepository { get; }

        public IMedicalRescueSupportRepository MedicalRescueSupportRepository { get; }

        public IPatrolOfficerRepository PatrolOfficerRepository { get; }

        public IReportPartiesRepository ReportPartiesRepository { get; }

        public IScenePreservationMeasureAttachmentRepository ScenePreservationMeasureAttachmentRepository { get; }

        public IScenePreservationMeasureRepository ScenePreservationMeasureRepository { get; }

        public ISuspectRepository SuspectRepository { get; }

        public IReportRepository ReportRepository { get; }

        public IUserRepository UserRepository { get; }

        public IUserCaseRepository UserCaseRepository { get; }

        public IVictimRepository VictimRepository { get; }

        public IWitnessRepository WitnessRepository { get; }

        public IMedicalRescueSupportAttachmentRepository MedicalRescueSupportAttachmentRepository { get; }

        public UnitOfWork(ApplicationDbContext context, ICaseRepository caseRepository, IEvidenceRepository evidenceRepository, IInitialResponseRepository initialResponseRepository, IMedicalRescueSupportRepository medicalRescueSupportRepository, IPatrolOfficerRepository patrolOfficerRepository, IReportPartiesRepository reportPartiesRepository, IScenePreservationMeasureAttachmentRepository scenePreservationMeasureAttachmentRepository, IScenePreservationMeasureRepository scenePreservationMeasureRepository, ISuspectRepository suspectRepository, IReportRepository reportRepository, IUserRepository userRepository, IUserCaseRepository userCaseRepository, IVictimRepository victimRepository, IWitnessRepository witnessRepository, IMedicalRescueSupportAttachmentRepository medicalRescueSupportAttachmentRepository)
        {
            _context = context;
            CaseRepository = caseRepository;
            EvidenceRepository = evidenceRepository;
            InitialResponseRepository = initialResponseRepository;
            MedicalRescueSupportRepository = medicalRescueSupportRepository;
            PatrolOfficerRepository = patrolOfficerRepository;
            ReportPartiesRepository = reportPartiesRepository;
            ScenePreservationMeasureAttachmentRepository = scenePreservationMeasureAttachmentRepository;
            ScenePreservationMeasureRepository = scenePreservationMeasureRepository;
            SuspectRepository = suspectRepository;
            ReportRepository = reportRepository;
            UserRepository = userRepository;
            UserCaseRepository = userCaseRepository;
            VictimRepository = victimRepository;
            WitnessRepository = witnessRepository;
            MedicalRescueSupportAttachmentRepository = medicalRescueSupportAttachmentRepository;
        }

        public async Task BeginTransactionAsync()
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitAsync()
        {
            await _transaction.CommitAsync();
        }

        public async Task RollbackAsync()
        {
            await _transaction.RollbackAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _transaction?.Dispose();
            _context.Dispose();
        }
    }

}
