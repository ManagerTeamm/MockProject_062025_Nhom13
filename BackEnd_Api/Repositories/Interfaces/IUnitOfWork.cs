using BackEnd_Api.Services.Interface;

namespace BackEnd_Api.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        #region Repositories
        ICaseRepository CaseRepository { get; }
        IEvidenceRepository EvidenceRepository { get; }
        IInitialResponseRepository InitialResponseRepository { get; }
        IMedicalRescueSupportRepository MedicalRescueSupportRepository { get; }
        IPatrolOfficerRepository PatrolOfficerRepository { get; }
        IReportPartiesRepository ReportPartiesRepository { get; }
        IScenePreservationMeasureAttachmentRepository ScenePreservationMeasureAttachmentRepository { get; }
        IScenePreservationMeasureRepository ScenePreservationMeasureRepository { get; }
        IMedicalRescueSupportAttachmentRepository MedicalRescueSupportAttachmentRepository { get; }
        ISuspectRepository SuspectRepository { get; }
        IReportRepository ReportRepository { get; }
        IUserRepository UserRepository { get; }
        IUserCaseRepository UserCaseRepository { get; }
        IVictimRepository VictimRepository { get; }
        IWitnessRepository WitnessRepository { get; }

        #endregion
        #region Methods
        Task SaveChangesAsync();
        Task BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
        #endregion
    }
}
