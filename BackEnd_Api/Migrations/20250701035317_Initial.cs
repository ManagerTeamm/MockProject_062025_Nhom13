using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd_Api.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cases",
                columns: table => new
                {
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TypeCase = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Severity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cases", x => x.CaseId);
                });

            migrationBuilder.CreateTable(
                name: "MeasureSurveys",
                columns: table => new
                {
                    MeasureSurveyId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TypeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Source = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Result = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeasureSurveys", x => x.MeasureSurveyId);
                });

            migrationBuilder.CreateTable(
                name: "Permissions",
                columns: table => new
                {
                    PermissionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.PermissionId);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "CaseResults",
                columns: table => new
                {
                    CaseResultId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ReportTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReportAnalyst = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdentifyMotive = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseResults", x => x.CaseResultId);
                    table.ForeignKey(
                        name: "FK_CaseResults_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId");
                });

            migrationBuilder.CreateTable(
                name: "SceneProtections",
                columns: table => new
                {
                    SceneProtectionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TimeStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeEnd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LOcationCover = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AttachedFiles = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SceneProtections", x => x.SceneProtectionId);
                    table.ForeignKey(
                        name: "FK_SceneProtections_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SceneSuports",
                columns: table => new
                {
                    SceneSuportId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TypeSuport = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocationAssigned = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AttachedFiles = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SceneSuports", x => x.SceneSuportId);
                    table.ForeignKey(
                        name: "FK_SceneSuports_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Suspects",
                columns: table => new
                {
                    SuspectId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Fullname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    National = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Dob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Identification = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CatchTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MugshotUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FingerPrintsHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HealthStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suspects", x => x.SuspectId);
                    table.ForeignKey(
                        name: "FK_Suspects_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Victims",
                columns: table => new
                {
                    VictimId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Fullname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Injuries = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Victims", x => x.VictimId);
                    table.ForeignKey(
                        name: "FK_Victims_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Witnesses",
                columns: table => new
                {
                    WitnessId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Fullname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contact = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Statement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Witnesses", x => x.WitnessId);
                    table.ForeignKey(
                        name: "FK_Witnesses_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RolePermissions",
                columns: table => new
                {
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PermissionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermissions", x => new { x.RoleId, x.PermissionId });
                    table.ForeignKey(
                        name: "FK_RolePermissions_Permissions_PermissionId",
                        column: x => x.PermissionId,
                        principalTable: "Permissions",
                        principalColumn: "PermissionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermissions_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AvatarUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateAttended = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserName);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Sentences",
                columns: table => new
                {
                    SentenceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseResultId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SentenceType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Duration = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Condition = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SentencingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sentences", x => x.SentenceId);
                    table.ForeignKey(
                        name: "FK_Sentences_CaseResults_CaseResultId",
                        column: x => x.CaseResultId,
                        principalTable: "CaseResults",
                        principalColumn: "CaseResultId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Sentences_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId");
                });

            migrationBuilder.CreateTable(
                name: "Timelines",
                columns: table => new
                {
                    TimelineId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseResultId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AttachedFile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Activity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timelines", x => x.TimelineId);
                    table.ForeignKey(
                        name: "FK_Timelines_CaseResults_CaseResultId",
                        column: x => x.CaseResultId,
                        principalTable: "CaseResults",
                        principalColumn: "CaseResultId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    EventId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SuspectId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TimeStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeEnd = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EventName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.EventId);
                    table.ForeignKey(
                        name: "FK_Events_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Events_Suspects_SuspectId",
                        column: x => x.SuspectId,
                        principalTable: "Suspects",
                        principalColumn: "SuspectId");
                });

            migrationBuilder.CreateTable(
                name: "Arrests",
                columns: table => new
                {
                    SuspectId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    OfficerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SuspectMirandaSignature = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArrestStartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ArrestEndTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Arrests", x => new { x.SuspectId, x.CaseId });
                    table.ForeignKey(
                        name: "FK_Arrests_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId");
                    table.ForeignKey(
                        name: "FK_Arrests_Suspects_SuspectId",
                        column: x => x.SuspectId,
                        principalTable: "Suspects",
                        principalColumn: "SuspectId");
                    table.ForeignKey(
                        name: "FK_Arrests_Users_OfficerId",
                        column: x => x.OfficerId,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "InvestigationPlans",
                columns: table => new
                {
                    InvestigationPlanId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedOfficerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DeadlineDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Result = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PlanContent = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvestigationPlans", x => x.InvestigationPlanId);
                    table.ForeignKey(
                        name: "FK_InvestigationPlans_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_InvestigationPlans_Users_CreatedOfficerId",
                        column: x => x.CreatedOfficerId,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Prosecutions",
                columns: table => new
                {
                    ProsecutionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProsecutorId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Decision = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DecisionDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prosecutions", x => x.ProsecutionId);
                    table.ForeignKey(
                        name: "FK_Prosecutions_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Prosecutions_Users_ProsecutorId",
                        column: x => x.ProsecutorId,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Reports",
                columns: table => new
                {
                    ReportId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TypeReport = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Severity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CaseLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReportedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReporterFullname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReporterEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReporterPhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OfficerApproveId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.ReportId);
                    table.ForeignKey(
                        name: "FK_Reports_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reports_Users_OfficerApproveId",
                        column: x => x.OfficerApproveId,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SceneDescriptions",
                columns: table => new
                {
                    SceneDescriptionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Provider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SceneDescriptions", x => x.SceneDescriptionId);
                    table.ForeignKey(
                        name: "FK_SceneDescriptions_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SceneDescriptions_Users_Provider",
                        column: x => x.Provider,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SceneMedias",
                columns: table => new
                {
                    SceneMediaId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DateTaken = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SceneSketchUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CapturedBy = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SceneMedias", x => x.SceneMediaId);
                    table.ForeignKey(
                        name: "FK_SceneMedias_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SceneMedias_Users_CapturedBy",
                        column: x => x.CapturedBy,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserCases",
                columns: table => new
                {
                    OfficerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Responsible = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCases", x => new { x.OfficerId, x.CaseId });
                    table.ForeignKey(
                        name: "FK_UserCases_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCases_Users_OfficerId",
                        column: x => x.OfficerId,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Warrants",
                columns: table => new
                {
                    WarrantId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PoliceReponse = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    WarrantName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AttachedFile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TimePublish = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Warrants", x => x.WarrantId);
                    table.ForeignKey(
                        name: "FK_Warrants_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Warrants_Users_PoliceReponse",
                        column: x => x.PoliceReponse,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Inmates",
                columns: table => new
                {
                    InmateId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SentenceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Fullname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AssignedFacility = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpectedRelease = table.Column<DateTime>(type: "datetime2", nullable: true),
                    HealthStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inmates", x => x.InmateId);
                    table.ForeignKey(
                        name: "FK_Inmates_Sentences_SentenceId",
                        column: x => x.SentenceId,
                        principalTable: "Sentences",
                        principalColumn: "SentenceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Interviews",
                columns: table => new
                {
                    InterviewId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    InvestigationPlanId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    InterviewerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IntervieweeId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeInterviewee = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AttachedFile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interviews", x => x.InterviewId);
                    table.ForeignKey(
                        name: "FK_Interviews_InvestigationPlans_InvestigationPlanId",
                        column: x => x.InvestigationPlanId,
                        principalTable: "InvestigationPlans",
                        principalColumn: "InvestigationPlanId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Interviews_Users_InterviewerId",
                        column: x => x.InterviewerId,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Indictments",
                columns: table => new
                {
                    IndictmentId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProsecutionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IssuedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Indictments", x => x.IndictmentId);
                    table.ForeignKey(
                        name: "FK_Indictments_Prosecutions_ProsecutionId",
                        column: x => x.ProsecutionId,
                        principalTable: "Prosecutions",
                        principalColumn: "ProsecutionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProsecutionSuspects",
                columns: table => new
                {
                    ProsecutionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SuspectId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProsecutionSuspects", x => new { x.ProsecutionId, x.SuspectId });
                    table.ForeignKey(
                        name: "FK_ProsecutionSuspects_Prosecutions_ProsecutionId",
                        column: x => x.ProsecutionId,
                        principalTable: "Prosecutions",
                        principalColumn: "ProsecutionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProsecutionSuspects_Suspects_SuspectId",
                        column: x => x.SuspectId,
                        principalTable: "Suspects",
                        principalColumn: "SuspectId");
                });

            migrationBuilder.CreateTable(
                name: "ReportSuspects",
                columns: table => new
                {
                    ReportId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SuspectId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportSuspects", x => new { x.ReportId, x.SuspectId });
                    table.ForeignKey(
                        name: "FK_ReportSuspects_Reports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Reports",
                        principalColumn: "ReportId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReportSuspects_Suspects_SuspectId",
                        column: x => x.SuspectId,
                        principalTable: "Suspects",
                        principalColumn: "SuspectId");
                });

            migrationBuilder.CreateTable(
                name: "ReportVictims",
                columns: table => new
                {
                    ReportId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    VictimId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportVictims", x => new { x.ReportId, x.VictimId });
                    table.ForeignKey(
                        name: "FK_ReportVictims_Reports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Reports",
                        principalColumn: "ReportId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReportVictims_Victims_VictimId",
                        column: x => x.VictimId,
                        principalTable: "Victims",
                        principalColumn: "VictimId");
                });

            migrationBuilder.CreateTable(
                name: "ReportWitness",
                columns: table => new
                {
                    ReportId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    WitnessId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportWitness", x => new { x.ReportId, x.WitnessId });
                    table.ForeignKey(
                        name: "FK_ReportWitness_Reports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Reports",
                        principalColumn: "ReportId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReportWitness_Witnesses_WitnessId",
                        column: x => x.WitnessId,
                        principalTable: "Witnesses",
                        principalColumn: "WitnessId");
                });

            migrationBuilder.CreateTable(
                name: "WarrantResults",
                columns: table => new
                {
                    WarrantResultId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    WarrantId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PoliceResponse = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TimeActive = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WarrantResults", x => x.WarrantResultId);
                    table.ForeignKey(
                        name: "FK_WarrantResults_Users_PoliceResponse",
                        column: x => x.PoliceResponse,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WarrantResults_Warrants_WarrantId",
                        column: x => x.WarrantId,
                        principalTable: "Warrants",
                        principalColumn: "WarrantId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    QuestionId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    InterviewId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Reliability = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.QuestionId);
                    table.ForeignKey(
                        name: "FK_Questions_Interviews_InterviewId",
                        column: x => x.InterviewId,
                        principalTable: "Interviews",
                        principalColumn: "InterviewId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Questions_Users_CreatedBy",
                        column: x => x.CreatedBy,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Evidences",
                columns: table => new
                {
                    EvidenceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MeasureSurveyId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    WarrantResultId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ReportId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CollectedBy = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TypeEvidence = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CollectedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CurrentLocation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AttachedFile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evidences", x => x.EvidenceId);
                    table.ForeignKey(
                        name: "FK_Evidences_MeasureSurveys_MeasureSurveyId",
                        column: x => x.MeasureSurveyId,
                        principalTable: "MeasureSurveys",
                        principalColumn: "MeasureSurveyId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Evidences_Reports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Reports",
                        principalColumn: "ReportId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Evidences_Users_CollectedBy",
                        column: x => x.CollectedBy,
                        principalTable: "Users",
                        principalColumn: "UserName",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Evidences_WarrantResults_WarrantResultId",
                        column: x => x.WarrantResultId,
                        principalTable: "WarrantResults",
                        principalColumn: "WarrantResultId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CaseEvidences",
                columns: table => new
                {
                    CaseId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EvidenceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CaseEvidences", x => new { x.CaseId, x.EvidenceId });
                    table.ForeignKey(
                        name: "FK_CaseEvidences_Cases_CaseId",
                        column: x => x.CaseId,
                        principalTable: "Cases",
                        principalColumn: "CaseId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CaseEvidences_Evidences_EvidenceId",
                        column: x => x.EvidenceId,
                        principalTable: "Evidences",
                        principalColumn: "EvidenceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DigitalInvests",
                columns: table => new
                {
                    EvidenceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DeviceType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnalystTool = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AttachedFiles = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DigitalInvests", x => x.EvidenceId);
                    table.ForeignKey(
                        name: "FK_DigitalInvests_Evidences_EvidenceId",
                        column: x => x.EvidenceId,
                        principalTable: "Evidences",
                        principalColumn: "EvidenceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "FinancialInvests",
                columns: table => new
                {
                    EvidenceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AttachedFiles = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancialInvests", x => x.EvidenceId);
                    table.ForeignKey(
                        name: "FK_FinancialInvests_Evidences_EvidenceId",
                        column: x => x.EvidenceId,
                        principalTable: "Evidences",
                        principalColumn: "EvidenceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ForensicInvests",
                columns: table => new
                {
                    EvidenceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LabName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReportFiles = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResultSummary = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReceivedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForensicInvests", x => x.EvidenceId);
                    table.ForeignKey(
                        name: "FK_ForensicInvests_Evidences_EvidenceId",
                        column: x => x.EvidenceId,
                        principalTable: "Evidences",
                        principalColumn: "EvidenceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PhysicalInvests",
                columns: table => new
                {
                    EvidenceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhysicalInvests", x => x.EvidenceId);
                    table.ForeignKey(
                        name: "FK_PhysicalInvests_Evidences_EvidenceId",
                        column: x => x.EvidenceId,
                        principalTable: "Evidences",
                        principalColumn: "EvidenceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RecordInfos",
                columns: table => new
                {
                    RecordInfoId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EvidenceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TypeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Source = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateCollected = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecordInfos", x => x.RecordInfoId);
                    table.ForeignKey(
                        name: "FK_RecordInfos_Evidences_EvidenceId",
                        column: x => x.EvidenceId,
                        principalTable: "Evidences",
                        principalColumn: "EvidenceId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SuspectEvidences",
                columns: table => new
                {
                    SuspectId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EvidenceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SuspectEvidences", x => new { x.SuspectId, x.EvidenceId });
                    table.ForeignKey(
                        name: "FK_SuspectEvidences_Evidences_EvidenceId",
                        column: x => x.EvidenceId,
                        principalTable: "Evidences",
                        principalColumn: "EvidenceId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SuspectEvidences_Suspects_SuspectId",
                        column: x => x.SuspectId,
                        principalTable: "Suspects",
                        principalColumn: "SuspectId");
                });

            migrationBuilder.CreateTable(
                name: "VictimEvidences",
                columns: table => new
                {
                    VictimId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EvidenceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VictimEvidences", x => new { x.VictimId, x.EvidenceId });
                    table.ForeignKey(
                        name: "FK_VictimEvidences_Evidences_EvidenceId",
                        column: x => x.EvidenceId,
                        principalTable: "Evidences",
                        principalColumn: "EvidenceId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VictimEvidences_Victims_VictimId",
                        column: x => x.VictimId,
                        principalTable: "Victims",
                        principalColumn: "VictimId");
                });

            migrationBuilder.CreateTable(
                name: "WarrantEvidences",
                columns: table => new
                {
                    WarrantId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EvidenceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WarrantEvidences", x => new { x.WarrantId, x.EvidenceId });
                    table.ForeignKey(
                        name: "FK_WarrantEvidences_Evidences_EvidenceId",
                        column: x => x.EvidenceId,
                        principalTable: "Evidences",
                        principalColumn: "EvidenceId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WarrantEvidences_Warrants_WarrantId",
                        column: x => x.WarrantId,
                        principalTable: "Warrants",
                        principalColumn: "WarrantId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Arrests_CaseId",
                table: "Arrests",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Arrests_OfficerId",
                table: "Arrests",
                column: "OfficerId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseEvidences_EvidenceId",
                table: "CaseEvidences",
                column: "EvidenceId");

            migrationBuilder.CreateIndex(
                name: "IX_CaseResults_CaseId",
                table: "CaseResults",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_CaseId",
                table: "Events",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_SuspectId",
                table: "Events",
                column: "SuspectId");

            migrationBuilder.CreateIndex(
                name: "IX_Evidences_CollectedBy",
                table: "Evidences",
                column: "CollectedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Evidences_MeasureSurveyId",
                table: "Evidences",
                column: "MeasureSurveyId");

            migrationBuilder.CreateIndex(
                name: "IX_Evidences_ReportId",
                table: "Evidences",
                column: "ReportId");

            migrationBuilder.CreateIndex(
                name: "IX_Evidences_WarrantResultId",
                table: "Evidences",
                column: "WarrantResultId");

            migrationBuilder.CreateIndex(
                name: "IX_Indictments_ProsecutionId",
                table: "Indictments",
                column: "ProsecutionId");

            migrationBuilder.CreateIndex(
                name: "IX_Inmates_SentenceId",
                table: "Inmates",
                column: "SentenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_InterviewerId",
                table: "Interviews",
                column: "InterviewerId");

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_InvestigationPlanId",
                table: "Interviews",
                column: "InvestigationPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_InvestigationPlans_CaseId",
                table: "InvestigationPlans",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_InvestigationPlans_CreatedOfficerId",
                table: "InvestigationPlans",
                column: "CreatedOfficerId");

            migrationBuilder.CreateIndex(
                name: "IX_Prosecutions_CaseId",
                table: "Prosecutions",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Prosecutions_ProsecutorId",
                table: "Prosecutions",
                column: "ProsecutorId");

            migrationBuilder.CreateIndex(
                name: "IX_ProsecutionSuspects_SuspectId",
                table: "ProsecutionSuspects",
                column: "SuspectId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_CreatedBy",
                table: "Questions",
                column: "CreatedBy");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_InterviewId",
                table: "Questions",
                column: "InterviewId");

            migrationBuilder.CreateIndex(
                name: "IX_RecordInfos_EvidenceId",
                table: "RecordInfos",
                column: "EvidenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_CaseId",
                table: "Reports",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_OfficerApproveId",
                table: "Reports",
                column: "OfficerApproveId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportSuspects_SuspectId",
                table: "ReportSuspects",
                column: "SuspectId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportVictims_VictimId",
                table: "ReportVictims",
                column: "VictimId");

            migrationBuilder.CreateIndex(
                name: "IX_ReportWitness_WitnessId",
                table: "ReportWitness",
                column: "WitnessId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermissions_PermissionId",
                table: "RolePermissions",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_SceneDescriptions_CaseId",
                table: "SceneDescriptions",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_SceneDescriptions_Provider",
                table: "SceneDescriptions",
                column: "Provider");

            migrationBuilder.CreateIndex(
                name: "IX_SceneMedias_CapturedBy",
                table: "SceneMedias",
                column: "CapturedBy");

            migrationBuilder.CreateIndex(
                name: "IX_SceneMedias_CaseId",
                table: "SceneMedias",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_SceneProtections_CaseId",
                table: "SceneProtections",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_SceneSuports_CaseId",
                table: "SceneSuports",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Sentences_CaseId",
                table: "Sentences",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Sentences_CaseResultId",
                table: "Sentences",
                column: "CaseResultId");

            migrationBuilder.CreateIndex(
                name: "IX_SuspectEvidences_EvidenceId",
                table: "SuspectEvidences",
                column: "EvidenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Suspects_CaseId",
                table: "Suspects",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Timelines_CaseResultId",
                table: "Timelines",
                column: "CaseResultId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCases_CaseId",
                table: "UserCases",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_VictimEvidences_EvidenceId",
                table: "VictimEvidences",
                column: "EvidenceId");

            migrationBuilder.CreateIndex(
                name: "IX_Victims_CaseId",
                table: "Victims",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_WarrantEvidences_EvidenceId",
                table: "WarrantEvidences",
                column: "EvidenceId");

            migrationBuilder.CreateIndex(
                name: "IX_WarrantResults_PoliceResponse",
                table: "WarrantResults",
                column: "PoliceResponse");

            migrationBuilder.CreateIndex(
                name: "IX_WarrantResults_WarrantId",
                table: "WarrantResults",
                column: "WarrantId");

            migrationBuilder.CreateIndex(
                name: "IX_Warrants_CaseId",
                table: "Warrants",
                column: "CaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Warrants_PoliceReponse",
                table: "Warrants",
                column: "PoliceReponse");

            migrationBuilder.CreateIndex(
                name: "IX_Witnesses_CaseId",
                table: "Witnesses",
                column: "CaseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Arrests");

            migrationBuilder.DropTable(
                name: "CaseEvidences");

            migrationBuilder.DropTable(
                name: "DigitalInvests");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "FinancialInvests");

            migrationBuilder.DropTable(
                name: "ForensicInvests");

            migrationBuilder.DropTable(
                name: "Indictments");

            migrationBuilder.DropTable(
                name: "Inmates");

            migrationBuilder.DropTable(
                name: "PhysicalInvests");

            migrationBuilder.DropTable(
                name: "ProsecutionSuspects");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "RecordInfos");

            migrationBuilder.DropTable(
                name: "ReportSuspects");

            migrationBuilder.DropTable(
                name: "ReportVictims");

            migrationBuilder.DropTable(
                name: "ReportWitness");

            migrationBuilder.DropTable(
                name: "RolePermissions");

            migrationBuilder.DropTable(
                name: "SceneDescriptions");

            migrationBuilder.DropTable(
                name: "SceneMedias");

            migrationBuilder.DropTable(
                name: "SceneProtections");

            migrationBuilder.DropTable(
                name: "SceneSuports");

            migrationBuilder.DropTable(
                name: "SuspectEvidences");

            migrationBuilder.DropTable(
                name: "Timelines");

            migrationBuilder.DropTable(
                name: "UserCases");

            migrationBuilder.DropTable(
                name: "VictimEvidences");

            migrationBuilder.DropTable(
                name: "WarrantEvidences");

            migrationBuilder.DropTable(
                name: "Sentences");

            migrationBuilder.DropTable(
                name: "Prosecutions");

            migrationBuilder.DropTable(
                name: "Interviews");

            migrationBuilder.DropTable(
                name: "Witnesses");

            migrationBuilder.DropTable(
                name: "Permissions");

            migrationBuilder.DropTable(
                name: "Suspects");

            migrationBuilder.DropTable(
                name: "Victims");

            migrationBuilder.DropTable(
                name: "Evidences");

            migrationBuilder.DropTable(
                name: "CaseResults");

            migrationBuilder.DropTable(
                name: "InvestigationPlans");

            migrationBuilder.DropTable(
                name: "MeasureSurveys");

            migrationBuilder.DropTable(
                name: "Reports");

            migrationBuilder.DropTable(
                name: "WarrantResults");

            migrationBuilder.DropTable(
                name: "Warrants");

            migrationBuilder.DropTable(
                name: "Cases");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
