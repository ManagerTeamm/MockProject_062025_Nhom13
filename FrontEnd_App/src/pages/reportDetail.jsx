import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/reportDetail.css';

const ReportDetail = () => {
  const [reportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch report data from API
    // setReportData(fetchedData);
    setLoading(false);
  }, []);

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
        <button className="btn btn-link text-decoration-none p-0 mb-3">
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </button>
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <span className="text-muted small">ReportID: {reportData?.reportId || "---"}</span>
              <div className="mt-1">
                <span className="text-muted small me-2">Status:</span>
                <span className={`badge ${reportData?.status === 'Pending' ? 'bg-warning' : 'bg-success'}`}>
                  {reportData?.status || "---"}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6 text-md-end mt-2 mt-md-0">
            <div className="d-flex flex-column align-items-md-end">
              <span className="text-muted small">Date: {reportData?.date || "---"}</span>
              <span className="text-muted small">Time: {reportData?.time || "---"}</span>
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
                <div className="mt-1">{reportData?.reporterFullname || "---"}</div>
              </div>
              <div className="mb-3">
                <strong>Relationship to the incident</strong>
                <div className="mt-1">{reportData?.relationshipToIncident || "---"}</div>
              </div>
              <div className="mb-3">
                <strong>Address</strong>
                <div className="mt-1">
                  {reportData?.reporterAddress ? (
                    <>
                      {reportData.reporterAddress.street}<br />
                      {reportData.reporterAddress.city}, {reportData.reporterAddress.state} {reportData.reporterAddress.zipCode}<br />
                      {reportData.reporterAddress.country}
                    </>
                  ) : "---"}
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="mb-3">
                <strong>Email</strong>
                <div className="mt-1">{reportData?.reporterEmail || "---"}</div>
              </div>
              <div className="mb-3">
                <strong>Phone</strong>
                <div className="mt-1">{reportData?.reporterPhoneNumber || "---"}</div>
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
                <div className="mt-1">{reportData?.typeOfCrime || "---"}</div>
              </div>
              <div className="mb-3">
                <strong>Datetime of occurrence</strong>
                <div className="mt-1">{reportData?.datetimeOfOccurrence || "---"}</div>
              </div>
              <div className="mb-3">
                <strong>Detailed address</strong>
                <div className="mt-1">
                  {reportData?.detailedAddress ? (
                    <>
                      {reportData.detailedAddress.street}<br />
                      {reportData.detailedAddress.city}, {reportData.detailedAddress.state} {reportData.detailedAddress.zipCode}<br />
                      {reportData.detailedAddress.country}
                    </>
                  ) : "---"}
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="mb-3">
                <strong>Severity</strong>
                <div className="mt-1">{reportData?.severity || "---"}</div>
              </div>
              <div className="mb-3">
                <strong>State</strong>
                <div className="mt-1">{reportData?.state || "---"}</div>
              </div>
              <div className="mb-3">
                <strong>Description of the incident</strong>
                <div className="mt-1">{reportData?.description || "---"}</div>
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
                {reportData?.victims?.length > 0 ? (
                  reportData.victims.map((victim, index) => (
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
                {reportData?.witnesses?.length > 0 ? (
                  reportData.witnesses.map((witness, index) => (
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
                {reportData?.evidences?.length > 0 ? (
                  reportData.evidences.map((evidence, index) => (
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
          {reportData?.uploadedFiles?.length > 0 && (
            <div className="mt-3">
              <small className="text-muted">Uploaded:</small>
              <div className="mt-2">
                {reportData.uploadedFiles.map((file, index) => (
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