import { reportService } from "../services/reportService"; 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ReportPage = () => {
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // Filter states
    const [selectedStatus, setSelectedStatus] = useState('All Status');
    const [selectedType, setSelectedType] = useState('All Types');
    const [selectedSeverity, setSelectedSeverity] = useState('All Severity');

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
    const severityLevels = ['Minor', 'Moderate', 'Serious', 'Critical'];

    // Status options
    const statusOptions = ['Approved', 'Pending', 'Rejected'];

    // Get reports from the API
    const getReports = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await reportService.getReports();
            if (response.success) {
                setReports(response.data || []);
            } else {
                setError(response.message || "Failed to fetch reports");
            }
        } catch (error) {
            console.error("Error fetching reports:", error);
            setError("Error fetching reports");
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

    // Get status based on some logic (you can customize this)
    const getStatus = (report) => {
        // Example logic - you can customize based on your business rules
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
            navigate(`/report-detail/${reportId}`);
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
        <div className="container-fluid p-2 p-md-4">
            {/* Header - Responsive */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 mb-md-4 gap-2">
                <h2 className="mb-0 fs-4 fs-md-2">Reports Management</h2>             
            </div>

            {/* Filters - Improved Responsive */}
            <div className="row mb-3">
                <div className="col-12">
                    <div className="d-flex gap-1 gap-md-2 flex-wrap">
                        <span className="fw-bold d-none d-md-inline">Filter:</span>
                        <span className="fw-bold d-md-none">Filters:</span>
                        
                        {/* Status Filter */}
                        <select 
                            className="form-select form-select-sm flex-fill flex-md-grow-0" 
                            style={{minWidth: '80px', maxWidth: '150px'}}
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
                            className="form-select form-select-sm flex-fill flex-md-grow-0" 
                            style={{minWidth: '100px', maxWidth: '160px'}}
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
                            className="form-select form-select-sm flex-fill flex-md-grow-0" 
                            style={{minWidth: '80px', maxWidth: '120px'}}
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
                            className="btn btn-outline-secondary btn-sm"
                            onClick={resetFilters}
                            title="Reset all filters"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

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
                                                <h6 className="mb-0 fw-bold">
                                                    #{report.reportId ? report.reportId.substring(0, 8) : 'N/A'}
                                                </h6>
                                                <span className={status.class}>
                                                    {status.text}
                                                </span>
                                            </div>
                                            
                                            <div className="row g-2 small">
                                                <div className="col-6">
                                                    <strong>Type:</strong><br/>
                                                    {report.typeReport || 'N/A'}
                                                </div>
                                                <div className="col-6">
                                                    <strong>Severity:</strong><br/>
                                                    <span className={`badge ${
                                                        report.severity === 'High' ? 'bg-danger' :
                                                        report.severity === 'Medium' ? 'bg-warning' : 'bg-info'
                                                    }`}>
                                                        {report.severity || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className="col-6">
                                                    <strong>Date:</strong><br/>
                                                    {formatDate(report.reportedAt)}
                                                </div>
                                                <div className="col-6">
                                                    <strong>Reporter:</strong><br/>
                                                    {report.reporterFullname || 'N/A'}
                                                </div>
                                            </div>
                                            
                                            <div className="mt-2">
                                                <button 
                                                    className="btn btn-sm btn-outline-primary w-100"
                                                    onClick={() => console.log('View details', report.reportId)}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-4">
                                    <div className="text-muted">
                                        <i className="fas fa-inbox fa-2x mb-2"></i>
                                        <p>No reports found</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Desktop Table View - Hide on small screens */}
                        <div className="table-responsive d-none d-md-block">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Report ID</th>
                                        <th>Type of Crime</th>
                                        <th>Severity</th>
                                        <th>Date</th>
                                        <th>Reporter</th>
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
                                                    <td>{report.typeReport || 'N/A'}</td>
                                                    <td>
                                                        <span className={`badge ${
                                                            report.severity === 'High' ? 'bg-danger' :
                                                            report.severity === 'Medium' ? 'bg-warning' : 'bg-info'
                                                        }`}>
                                                            {report.severity || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td>{formatDate(report.reportedAt)}</td>
                                                    <td>
                                                        <div>
                                                            <div className="fw-bold">{report.reporterFullname || 'N/A'}</div>
                                                            <small className="text-muted">
                                                                {truncateText(report.reporterEmail, 20)}
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
                                                            onClick={() =>handleViewDetail(report.reportId)}
                                                        >
                                                            View detail
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center py-4">
                                                <div className="text-muted">
                                                    <i className="fas fa-inbox fa-2x mb-2"></i>
                                                    <p>No reports found</p>
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
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item active">
                            <a className="page-link" href="#">1</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">2</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">3</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
// ...existing code...
};

export default ReportPage;