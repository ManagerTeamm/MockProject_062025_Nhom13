import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/reportDetail.css';
import { reportService } from "../services/reportService";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from '../components/sidebar';
import { getFullAttachmentUrl} from '../utils/apiConfig';
const ReportDetail = () => {
  const { reportId } = useParams(); // Lấy reportId từ URL params
  const [reporDetail, setReportDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approving, setApproving] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [currentMedia, setCurrentMedia] = useState({ url: '', type: '', name: '' });
  const navigator = useNavigate();
  const getReportDetail = async (reportId) => {
    setLoading(true);
    setError(null);
    try {
        const response = await reportService.getReportDetail(reportId);
        console.log("Report Detail Response:", response.data);
      if (response.success) {
        setReportDetail(response.data || []);
      } else {
        setError(response.message || "Failed to fetch reports");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError("Error fetching reports");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (reportId) {
      getReportDetail(reportId);
    } else {
      setError("Report ID is missing");
      setLoading(false);
    }
  }, [reportId]);
  const handleBack = () => {
    navigator(-1);
  }

  // Xử lý approve report
  const handleApprove = async () => {
    if (!reportId) return;
    
    setApproving(true);
    try {
      const response = await reportService.approveReport(reportId);
      console.log("Approve Report Response:", response);
      if (response.success) {
        alert('Report approved successfully!');
        // Refresh data to update status
        await getReportDetail(reportId);
      } else {
        alert('Failed to approve report: ' + response.message);
      }
    } catch (error) {
      console.error('Error approving report:', error);
      alert('Error approving report: ' + error.message);
    } finally {
      setApproving(false);
    }
  };

  // Xử lý xem media
  const handleViewMedia = (attachmentUrl, fileName) => {
    if (!attachmentUrl) return;
    
    // Tạo full URL từ đường dẫn
    const fullUrl = getFullAttachmentUrl(attachmentUrl);
    console.log('Original attachment URL:', attachmentUrl);
    console.log('Full attachment URL:', fullUrl);
  
    // Xác định loại file
    const mediaType = getFileType(attachmentUrl);
    console.log('Media type:', mediaType);
    
    setCurrentMedia({
      url: fullUrl,
      type: mediaType,
      name: fileName || 'Attachment'
    });
    setShowMediaModal(true);
  };
  const getFileType = (filePath) => {
      if (!filePath) return 'unknown';
      
      const fileExtension = filePath.split('.').pop().toLowerCase();
      
      if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(fileExtension)) {
        return 'image';
      } else if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(fileExtension)) {
        return 'video';
      } else if (['pdf'].includes(fileExtension)) {
        return 'pdf';
      }
      return 'unknown';
    };
  // Đóng modal
  const closeMediaModal = () => {
    setShowMediaModal(false);
    setCurrentMedia({ url: '', type: '', name: '' });
  };

  // Thêm helper function để format date và time
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return { date: "---", time: "---" };

    const dateTime = new Date(dateTimeString);

    // Format date (DD/MM/YYYY)
    const date = dateTime.toLocaleDateString('en-GB'); // hoặc 'vi-VN' cho định dạng Việt Nam

    // Format time (HH:MM)
    const time = dateTime.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // 24-hour format
    });

    return { date, time };
  };
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      {/* Sidebar cố định 250px */}
      <div className="bg-light border-end min-vh-100" style={{ width: "250px" }}>
        <Sidebar />
      </div>
      <div className="container-fluid px-3 py-4">
        {/* Header */}
        <div className="mb-4">
          <button className="btn btn-link text-decoration-none p-0 mb-3" onClick={handleBack}>
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>

          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex flex-column">
                <span className="text-muted small">ReportID: {reporDetail?.reportId || "---"}</span>
                <div className="mt-1">
                  <span className="text-muted small me-2">Status:</span>
                  {reporDetail?.officerApprove === null ?
                    (<span className="badge bg-secondary">Pending</span>)
                    :
                    (<span className="badge bg-secondary">Approved</span>)}
                </div>
              </div>
            </div>
            <div className="col-md-6 text-md-end mt-2 mt-md-0">
              <div className="d-flex flex-column align-items-md-end">
                <span className="text-muted small">
                  Date: {formatDateTime(reporDetail?.reportedAt).date}
                </span>
                <span className="text-muted small">
                  Time: {formatDateTime(reporDetail?.reportedAt).time}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-center mb-5 fw-bold">REPORT DETAIL</h3>

        {/* My Information Section */}
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="text-danger mb-4 fw-bold">MY INFORMATION</h4>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <strong>Full name</strong>
                  <div className="mt-1">{reporDetail?.reporterFullname || "---"}</div>
                </div>
                <div className="mb-3">
                  <strong>Relationship to the incident</strong>
                  <div className="mt-1">{reporDetail?.relationshipToIncident || "---"}</div>
                </div>
                <div className="mb-3">
                  <strong>Address</strong>
                  <div className="mt-1">
                    {reporDetail?.addressReported || "---"}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <strong>Email</strong>
                  <div className="mt-1">{reporDetail?.reporterEmail || "---"}</div>
                </div>
                <div className="mb-3">
                  <strong>Phone</strong>
                  <div className="mt-1">{reporDetail?.reporterPhoneNumber || "---"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Incident Information Section */}
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="text-danger mb-4 fw-bold">INCIDENT INFORMATION</h4>

            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <strong>Type of Crime</strong>
                  <div className="mt-1">{reporDetail?.typeReport || "---"}</div>
                </div>
                <div className="mb-3">
                  <strong>Datetime of occurrence</strong>
                  <div className="mt-1">{reporDetail?.timeOfOccurrence || "---"}</div>
                </div>
                <div className="mb-3">
                  <strong>Detailed address</strong>
                  <div className="mt-1">
                    {reporDetail?.caseLocation || "---"}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <strong>Severity</strong>
                  <div className="mt-1">{reporDetail?.severity || "---"}</div>
                </div>
                <div className="mb-3">
                  <strong>State</strong>
                  <div className="mt-1">{reporDetail?.state || "---"}</div>
                </div>
                <div className="mb-3">
                  <strong>Description of the incident</strong>
                  <div className="mt-1">{reporDetail?.description || "---"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Relevant Information Section */}
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="text-danger mb-4 fw-bold">RELEVANT INFORMATION</h4>

            {/* Relevant Parties */}
            <h5 className="text-primary mb-3 fw-bold">I. Relevant Parties</h5>

            {/* Victims */}
            <h6 className="mb-3">A/ Victim</h6>
            <div className="table-responsive mb-4">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: "80px" }}>ID</th>
                    <th>Full Name</th>
                    <th style={{ width: "100px" }}>Gender</th>
                    <th style={{ width: "120px" }}>Nationality</th>
                    <th>Description</th>
                  </tr>
                </thead>
                  <tbody>
                  {reporDetail?.reportParties?.filter(p => p.typeOfParties === "victim").length > 0 ? (
                    reporDetail.reportParties
                      .filter(p => p.typeOfParties === "victim")
                      .map((victim, index) => (
                        <tr key={index}>
                          <td>#{victim.id}</td>
                          <td>{victim.fullName}</td>
                          <td>{victim.gender}</td>
                          <td>{victim.national}</td>
                          <td>{victim.description}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No victims data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Witnesses */}
            <h6 className="mb-3">B/ Witness</h6>
            <div className="table-responsive mb-4">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: "80px" }}>ID</th>
                    <th>Full Name</th>
                    <th style={{ width: "100px" }}>Gender</th>
                    <th style={{ width: "120px" }}>Nationality</th>
                    <th>Statement / Description</th>
                  </tr>
                </thead>
                <tbody>
                  {reporDetail?.reportParties?.filter(p => p.typeOfParties === "witness").length > 0 ? (
                    reporDetail.reportParties
                      .filter(p => p.typeOfParties === "witness")
                      .map((victim, index) => (
                        <tr key={index}>
                          <td>#{victim.id}</td>
                          <td>{victim.fullName}</td>
                          <td>{victim.gender}</td>
                          <td>{victim.national}</td>
                          <td>{victim.description}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">No witnesses data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Suspect */}
            <h6 className="mb-3">B/ Suspect</h6>
            <div className="table-responsive mb-4">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: "80px" }}>ID</th>
                    <th>Full Name</th>
                    <th style={{ width: "100px" }}>Gender</th>
                    <th style={{ width: "120px" }}>Nationality</th>
                    <th>Statement / Description</th>
                  </tr>
                </thead>
                <tbody>
                  {reporDetail?.reportParties?.filter(p => p.typeOfParties === "suspect").length > 0 ? (
                    reporDetail.reportParties
                      .filter(p => p.typeOfParties === "suspect")
                      .map((victim, index) => (
                        <tr key={index}>
                          <td>#{victim.id}</td>
                          <td>{victim.fullName}</td>
                          <td>{victim.gender}</td>
                          <td>{victim.national}</td>
                          <td>{victim.description}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">No Suspect data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Initial Evidence */}
            <h5 className="text-primary mb-3 fw-bold">II. Initial Evidence</h5>
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: "80px" }}>ID</th>
                    <th style={{ width: "150px" }}>Type</th>
                    <th>Evidence Location</th>
                    <th>Description</th>
                    <th style={{ width: "200px" }}>Attachments</th>
                  </tr>
                </thead>
                <tbody>
                  {reporDetail?.evidences?.length > 0 ? (
                    reporDetail.evidences.map((evidence, index) => (
                      <tr key={index}>
                        <td>#{evidence.id}</td>
                        <td>{evidence.type}</td>
                        <td>{evidence.location}</td>
                        <td>{evidence.description}</td>
                        <td className="evidence-attachment">
                          {evidence.attachments ? (
                            <div className="d-flex align-items-center">
                              {getFileType(evidence.attachments) === 'image' ? (
                                <div className="me-2">
                                  <img 
                                    src={getFullAttachmentUrl(evidence.attachments)} 
                                    alt={`Evidence ${evidence.id}`}
                                    className="img-thumbnail"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover', cursor: 'pointer' }}
                                    onClick={() => handleViewMedia(evidence.attachments, `Evidence ${evidence.id} - ${evidence.type}`)}
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'inline-block';
                                    }}
                                  />
                                  <div 
                                    className="text-center p-2 border rounded bg-light"
                                    style={{ width: '60px', height: '60px', display: 'none', cursor: 'pointer' }}
                                    onClick={() => handleViewMedia(evidence.attachments, `Evidence ${evidence.id} - ${evidence.type}`)}
                                  >
                                    <i className="bi bi-image text-muted"></i>
                                    <br />
                                    <small className="text-muted">Error</small>
                                  </div>
                                </div>
                              ) : getFileType(evidence.attachments) === 'video' ? (
                                <div className="me-2">
                                  <div 
                                    className="text-center p-2 border rounded bg-light file-icon-container"
                                    style={{ width: '60px', height: '60px' }}
                                    onClick={() => handleViewMedia(evidence.attachments, `Evidence ${evidence.id} - ${evidence.type}`)}
                                  >
                                    <i className="bi bi-play-circle fs-4 text-primary"></i>
                                    <br />
                                    <small className="text-muted">Video</small>
                                  </div>
                                </div>
                              ) : (
                                <div className="me-2">
                                  <div 
                                    className="text-center p-2 border rounded bg-light file-icon-container"
                                    style={{ width: '60px', height: '60px' }}
                                    onClick={() => handleViewMedia(evidence.attachments, `Evidence ${evidence.id} - ${evidence.type}`)}
                                  >
                                    <i className="bi bi-file-earmark fs-4 text-secondary"></i>
                                    <br />
                                    <small className="text-muted">File</small>
                                  </div>
                                </div>
                              )}
                              {/* <button 
                                className="btn btn-link btn-sm p-0 text-primary"
                                onClick={() => handleViewMedia(evidence.attachments, `Evidence ${evidence.id} - ${evidence.type}`)}
                              >
                                <i className="bi bi-eye me-1"></i>
                                View
                              </button> */}
                            </div>
                          ) : (
                            <span className="text-muted">No attachment</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">No evidence data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-3 mt-4">
          <button 
            className="btn btn-secondary px-4"
            onClick={() => window.print()}
          >
            <i className="bi bi-printer me-2"></i>
            Print
          </button>
          
          {reporDetail?.officerApprove === null && (
            <>
              <button 
                className="btn btn-danger px-4"
                onClick={() => alert('Decline functionality not implemented')}
              >
                <i className="bi bi-x-circle me-2"></i>
                Decline
              </button>
              
              <button 
                className="btn btn-success px-4"
                onClick={handleApprove}
                disabled={approving}
              >
                {approving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Approving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Approve
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* Media Modal */}
        {showMediaModal && (
          <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className="bi bi-file-earmark me-2"></i>
                    {currentMedia.name}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={closeMediaModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-center">
                  {currentMedia.type === 'image' && (
                    <img 
                      src={currentMedia.url} 
                      alt={currentMedia.name}
                      className="img-fluid rounded"
                      style={{ maxHeight: '500px' }}
                    />
                  )}
                  
                  {currentMedia.type === 'video' && (
                    <video 
                      controls 
                      className="w-100 rounded"
                      style={{ maxHeight: '500px' }}
                    >
                      <source src={currentMedia.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  
                  {currentMedia.type === 'pdf' && (
                    <iframe
                      src={currentMedia.url}
                      width="100%"
                      height="500px"
                      className="rounded"
                      title={currentMedia.name}
                    />
                  )}
                  
                  {currentMedia.type === 'unknown' && (
                    <div className="text-center py-5">
                      <i className="bi bi-file-earmark-x fs-1 text-muted"></i>
                      <p className="mt-3 text-muted">
                        Cannot preview this file type. 
                        <br />
                        <a href={currentMedia.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">
                          <i className="bi bi-download me-2"></i>
                          Download File
                        </a>
                      </p>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <a 
                    href={currentMedia.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    <i className="bi bi-box-arrow-up-right me-2"></i>
                    Open in New Tab
                  </a>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={closeMediaModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetail;