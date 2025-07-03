import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/reportDetail.css';
import { reportService } from "../services/reportService"; 
import { useParams, useNavigate } from "react-router-dom";
const ReportDetail = () => {
  const {reportId} = useParams(); // Lấy reportId từ URL params
  const [reporDetail, setReportDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigator = useNavigate();
  const getReportDetail = async (reportId) => {
      setLoading(true);
      setError(null);
      try {
        const response = await reportService.getReportDetail(reportId);
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
 console.log(reportId);
  const handleBack = () => {
    navigator(-1); 
  }
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

  return (
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
                  Date: {reporDetail?.reportedAt 
                    ? new Date(reporDetail.reportedAt).toLocaleDateString('en-GB') 
                    : "---"
                  }
                </span>
                <span className="text-muted small">
                  Time: {reporDetail?.reportedAt 
                    ? new Date(reporDetail.reportedAt).toLocaleTimeString('en-GB', { 
                        hour: '2-digit', 
                        minute: '2-digit',
                        hour12: false 
                      }) 
                    : "---"
                  }
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
                  <th>Statement / Description</th>
                </tr>
              </thead>
              <tbody>
                {reporDetail?.victims?.length > 0 ? (
                  reporDetail.victims.map((victim, index) => (
                    <tr key={index}>
                      <td>#{victim.id}</td>
                      <td>{victim.fullName}</td>
                      <td>{victim.gender}</td>
                      <td>{victim.nationality}</td>
                      <td>{victim.statement}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">No victims data</td>
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
                {reporDetail?.witnesses?.length > 0 ? (
                  reporDetail.witnesses.map((witness, index) => (
                    <tr key={index}>
                      <td>#{witness.id}</td>
                      <td>{witness.fullName}</td>
                      <td>{witness.gender}</td>
                      <td>{witness.nationality}</td>
                      <td>{witness.statement}</td>
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
                {reporDetail?.suspects?.length > 0 ? (
                  reporDetail.suspects.map((witness, index) => (
                    <tr key={index}>
                      <td>#{witness.id}</td>
                      <td>{witness.fullName}</td>
                      <td>{witness.gender}</td>
                      <td>{witness.nationality}</td>
                      <td>{witness.statement}</td>
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
                  <th style={{ width: "150px" }}>Attachments</th>
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
                      <td>
                        {evidence.attachments && (
                          <button className="btn btn-link btn-sm p-0">
                            <i className="bi bi-eye me-1"></i>
                            {evidence.attachments}
                          </button>
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
          
          {/* Uploaded Files */}
          {reporDetail?.uploadedFiles?.length > 0 && (
            <div className="mt-3">
              <small className="text-muted">Uploaded:</small>
              <div className="mt-2">
                {reporDetail.uploadedFiles.map((file, index) => (
                  <div key={index} className="d-inline-flex align-items-center bg-light rounded p-2 me-2 mb-2">
                    <button className="btn btn-link btn-sm p-0 me-2">
                      <i className="bi bi-download"></i>
                    </button>
                    <div className="d-flex flex-column">
                      <small className="fw-medium">{file.name}</small>
                      <small className="text-muted">{file.size} - {file.date}</small>
                    </div>
                    <button className="btn btn-link btn-sm p-0 ms-2">×</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;