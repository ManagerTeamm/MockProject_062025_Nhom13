import { reportService } from "../services/reportService";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/reports.css';
import Sidebar from '../components/sidebar';
const ReportPage = () => {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // Filter states
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [selectedType, setSelectedType] = useState('All Types');
    const [selectedSeverity, setSelectedSeverity] = useState('All Severity');
    // Mobile sidebar state
    const [showSidebar, setShowSidebar] = useState(false);

    // Crime Types based on the dropdown image
    const crimeTypes = [
        'Crimes Against Persons',
        'Crimes Against Property',
        'White-Collar Crimes',
        'Cyber Crimes',
        'Drug-related Crimes',
        'Public Order Crimes'
    ];

    // Severity levels
    const severityLevels = ['Urgent', 'No Urgent'];

    // Status options
    const statusOptions = ['Approved', 'Pending', 'Rejected'];

    // Get reports from the API
    const getReports = async () => {
        setLoading(true);
        try {
            const response = await reportService.getReports();
            if (response.success) {
                setReports(response.data || []);
            } else {
                console.error(response.message || "Failed to fetch reports");
            }
        } catch (error) {
            console.error("Error fetching reports:", error);
        } finally {
            setLoading(false);
        }
    };

    // Format date to display
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    // Get status based on some logic
    const getStatus = (report) => {
        if (report.isDeleted) return { text: 'Rejected', class: 'badge bg-danger' };
        if (report.officerApproveId) return { text: 'Approved', class: 'badge bg-success' };
        return { text: 'Pending', class: 'badge bg-warning' };
    };

    // Truncate long text
    const truncateText = (text, maxLength = 50) => {
        if (!text) return 'N/A';
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    // Filter reports based on selected criteria
    const filterReports = () => {
        let filtered = reports;

        // Filter by status
        if (selectedStatus !== 'All Status') {
            filtered = filtered.filter(report => {
                const status = getStatus(report);
                return status.text === selectedStatus;
            });
        }

        // Filter by type
        if (selectedType !== 'All Types') {
            filtered = filtered.filter(report => report.typeReport === selectedType);
        }

        // Filter by severity
        if (selectedSeverity !== 'All Severity') {
            filtered = filtered.filter(report => report.severity === selectedSeverity);
        }

        setFilteredReports(filtered);
    };

    // Handle filter changes
    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handleSeverityChange = (e) => {
        setSelectedSeverity(e.target.value);
    };

    // Reset all filters
    const resetFilters = () => {
        setSelectedStatus('All Status');
        setSelectedType('All Types');
        setSelectedSeverity('All Severity');
    };


    const handleViewDetail = (reportId) => {
        if (reportId) {
            navigate(`/secure/admin/report-detail/${reportId}`);
        } else {
            console.error('Report ID is missing');
        }
    }

    useEffect(() => {
        getReports();
    }, []);

    // Filter reports when filters change or reports data changes
    useEffect(() => {
        filterReports();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reports, selectedStatus, selectedType, selectedSeverity]);


    return (
        <div className="d-flex">
            {/* Mobile Navigation Header */}
            <div className="d-lg-none position-fixed top-0 start-0 end-0 bg-light border-bottom p-2" style={{ zIndex: 1050 }}>
                <div className="d-flex justify-content-between align-items-center">
                    <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        <i className="bi bi-list"></i>
                    </button>
                    <h6 className="mb-0 fw-bold">Reports Management</h6>
                    <div style={{ width: '40px' }}></div> {/* Spacer for alignment */}
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {showSidebar && (
                <div 
                    className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 sidebar-overlay"
                    style={{ zIndex: 1040 }}
                    onClick={() => setShowSidebar(false)}
                >
                    <div 
                        className="position-absolute top-0 start-0 bg-light h-100 mobile-sidebar show"
                        style={{ width: "250px", overflowY: "auto" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                            <h6 className="mb-0">Menu</h6>
                            <button 
                                className="btn-close"
                                onClick={() => setShowSidebar(false)}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="sidebar-content">
                            <Sidebar hideToggleButton={true} />
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="bg-light border-end min-vh-100" style={{ width: "250px" }}>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-grow-1" style={{ backgroundColor: "#667A8A", minHeight: "100vh" }}>
                <div className="container-fluid p-2 p-md-4" style={{ paddingTop: "70px" }}>
                {/* Header - Responsive */}
                <div className="card shadow-sm mb-4">
                    <div className="card-body text-center">
                        <h2 className="mb-0">Reports Management</h2>
                    </div>
                </div>

                {/* Filters - Improved Responsive */}
                <div className="row mb-3">
                    <div className="col-12">
                        <div className="d-flex gap-1 gap-md-2 flex-wrap align-items-center">
                            <span className="fw-bold d-none d-md-inline me-2">Filter:</span>
                            <span className="fw-bold d-md-none me-2 mb-2 w-100">Filters:</span>

                            {/* Status Filter */}
                            <select
                                className="form-select form-select-sm flex-fill flex-md-grow-0 mb-2 mb-md-0"
                                style={{ minWidth: '90px', maxWidth: '150px' }}
                                value={selectedStatus}
                                onChange={handleStatusChange}
                            >
                                <option value="All Status">All Status</option>
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>

                            {/* Crime Type Filter */}
                            <select
                                className="form-select form-select-sm flex-fill flex-md-grow-0 mb-2 mb-md-0"
                                style={{ minWidth: '100px', maxWidth: '160px' }}
                                value={selectedType}
                                onChange={handleTypeChange}
                            >
                                <option value="All Types">All Types</option>
                                {crimeTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>

                            {/* Severity Filter */}
                            <select
                                className="form-select form-select-sm flex-fill flex-md-grow-0 mb-2 mb-md-0"
                                style={{ minWidth: '90px', maxWidth: '120px' }}
                                value={selectedSeverity}
                                onChange={handleSeverityChange}
                            >
                                <option value="All Severity">All Severity</option>
                                {severityLevels.map(severity => (
                                    <option key={severity} value={severity}>{severity}</option>
                                ))}
                            </select>

                            {/* Reset Filters Button */}
                            <button
                                className="btn btn-outline-secondary btn-sm mb-2 mb-md-0"
                                onClick={resetFilters}
                                title="Reset all filters"
                            >
                                <i className="bi bi-arrow-clockwise d-md-none"></i>
                                <span className="d-none d-md-inline">Reset</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                
                {/* {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )} */}
                
                {/* Loading */}
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading reports...</p>
                    </div>
                ) : (
                    /* Reports Table - Enhanced Responsive */
                    <div className="card">
                        <div className="card-body p-0">
                            {/* Mobile Card View - Show on small screens */}
                            <div className="d-md-none">
                                {filteredReports && filteredReports.length > 0 ? (
                                    filteredReports.map((report, index) => {
                                        const status = getStatus(report);
                                        return (
                                            <div key={report.reportId || index} className="border-bottom p-3">
                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h6 className="mb-0 fw-bold text-primary">
                                                        #{report.reportId ? report.reportId.substring(0, 8) : 'N/A'}
                                                    </h6>
                                                    <span className={status.class}>
                                                        {status.text}
                                                    </span>
                                                </div>

                                                <div className="row g-2 small mb-3">
                                                    <div className="col-12">
                                                        <strong>Type:</strong><br />
                                                        <span className="text-muted">{report.typeReport || 'N/A'}</span>
                                                    </div>
                                                    <div className="col-6">
                                                        <strong>Severity:</strong><br />
                                                        <span className={`badge ${
                                                            report.severity === 'Urgent' ? 'bg-danger' :
                                                            report.severity === 'No Urgent' ? 'bg-info' : 'bg-secondary'
                                                        }`}>
                                                            {report.severity || 'N/A'}
                                                        </span>
                                                    </div>
                                                    <div className="col-6">
                                                        <strong>Date:</strong><br />
                                                        <span className="text-muted">{formatDate(report.reportedAt)}</span>
                                                    </div>
                                                    <div className="col-12">
                                                        <strong>Reporter:</strong><br />
                                                        <span className="text-muted">{report.reporterFullname || 'N/A'}</span>
                                                        {report.reporterEmail && (
                                                            <div className="small text-muted">
                                                                {truncateText(report.reporterEmail, 25)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-2">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary w-100"
                                                        onClick={() => handleViewDetail(report.reportId)}
                                                    >
                                                        <i className="bi bi-eye me-2"></i>
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-5">
                                        <div className="text-muted">
                                            <i className="bi bi-inbox fs-1 mb-3"></i>
                                            <p>No reports found</p>
                                            <small>Try adjusting your filters</small>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Tablet Card View - Show on medium screens (tablets) */}
                            <div className="d-none d-md-block d-lg-none">
                                {filteredReports && filteredReports.length > 0 ? (
                                    <div className="row g-3 p-3">
                                        {filteredReports.map((report, index) => {
                                            const status = getStatus(report);
                                            return (
                                                <div key={report.reportId || index} className="col-md-6">
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                                <h6 className="card-title mb-0 text-primary">
                                                                    #{report.reportId ? report.reportId.substring(0, 12) : 'N/A'}
                                                                </h6>
                                                                <span className={status.class}>
                                                                    {status.text}
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="mb-3">
                                                                <div className="small text-muted mb-1">Crime Type</div>
                                                                <div className="fw-bold">{report.typeReport || 'N/A'}</div>
                                                            </div>

                                                            <div className="row g-2 mb-3">
                                                                <div className="col-6">
                                                                    <div className="small text-muted">Severity</div>
                                                                    <span className={`badge ${
                                                                        report.severity === 'Urgent' ? 'bg-danger' :
                                                                        report.severity === 'No Urgent' ? 'bg-info' : 'bg-secondary'
                                                                    }`}>
                                                                        {report.severity || 'N/A'}
                                                                    </span>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="small text-muted">Date</div>
                                                                    <div className="small">{formatDate(report.reportedAt)}</div>
                                                                </div>
                                                            </div>

                                                            <div className="mb-3">
                                                                <div className="small text-muted mb-1">Reporter</div>
                                                                <div className="fw-bold">{report.reporterFullname || 'N/A'}</div>
                                                                {report.reporterEmail && (
                                                                    <div className="small text-muted">
                                                                        {truncateText(report.reporterEmail, 30)}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <button
                                                                className="btn btn-sm btn-outline-primary w-100"
                                                                onClick={() => handleViewDetail(report.reportId)}
                                                            >
                                                                <i className="bi bi-eye me-2"></i>
                                                                View Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-5">
                                        <div className="text-muted">
                                            <i className="bi bi-inbox fs-1 mb-3"></i>
                                            <p>No reports found</p>
                                            <small>Try adjusting your filters</small>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Desktop Table View - Show on large screens only */}
                            <div className="table-responsive d-none d-lg-block">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Report ID</th>
                                            <th>Type of Crime</th>
                                            <th className="d-none d-lg-table-cell">Severity</th>
                                            <th className="d-none d-xl-table-cell">Date</th>
                                            <th className="d-none d-lg-table-cell">Reporter</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredReports && filteredReports.length > 0 ? (
                                            filteredReports.map((report, index) => {
                                                const status = getStatus(report);
                                                return (
                                                    <tr key={report.reportId || index}>
                                                        <td>
                                                            <span className="fw-bold">
                                                                #{report.reportId ? report.reportId.substring(0, 8) : 'N/A'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="text-truncate" style={{ maxWidth: "150px" }}>
                                                                {report.typeReport || 'N/A'}
                                                            </div>
                                                        </td>
                                                        <td className="d-none d-lg-table-cell">
                                                            <span className={`badge ${
                                                                report.severity === 'Urgent' ? 'bg-danger' :
                                                                report.severity === 'No Urgent' ? 'bg-info' : 'bg-secondary'
                                                            }`}>
                                                                {report.severity || 'N/A'}
                                                            </span>
                                                        </td>
                                                        <td className="d-none d-xl-table-cell">{formatDate(report.reportedAt)}</td>
                                                        <td className="d-none d-lg-table-cell">
                                                            <div>
                                                                <div className="fw-bold text-truncate" style={{ maxWidth: "120px" }}>
                                                                    {report.reporterFullname || 'N/A'}
                                                                </div>
                                                                <small className="text-muted text-truncate d-block" style={{ maxWidth: "120px" }}>
                                                                    {truncateText(report.reporterEmail, 15)}
                                                                </small>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className={status.class}>
                                                                {status.text}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() => handleViewDetail(report.reportId)}
                                                            >
                                                                <i className="bi bi-eye d-md-none"></i>
                                                                <span className="d-none d-md-inline">View</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center py-5">
                                                    <div className="text-muted">
                                                        <i className="bi bi-inbox fs-1 mb-3"></i>
                                                        <p>No reports found</p>
                                                        <small>Try adjusting your filters</small>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pagination - Responsive */}
                {filteredReports && filteredReports.length > 0 && (
                    <nav className="mt-4">
                        <ul className="pagination justify-content-center flex-wrap">
                            <li className="page-item">
                                <button className="page-link" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </button>
                            </li>
                            <li className="page-item active">
                                <button className="page-link">1</button>
                            </li>
                            <li className="page-item">
                                <button className="page-link">2</button>
                            </li>
                            <li className="page-item">
                                <button className="page-link">3</button>
                            </li>
                            <li className="page-item">
                                <button className="page-link" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
                </div>
            </div>
        </div>
    );
};

export default ReportPage;