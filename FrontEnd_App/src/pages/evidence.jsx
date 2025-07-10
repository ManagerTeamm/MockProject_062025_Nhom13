import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import '../styles/investigation.css';
import '../styles/evidence.css';
import { getAllEvidence, getEvidencePaginated, filterEvidence, createEvidence } from '../services/evidenceService';

const statusClass = status => {
  if (status === 'Waiting for Test') return 'status-waiting';
  if (status === 'In Progress') return 'status-progress';
  if (status === 'Tested') return 'status-tested';
  return '';
};

const Evidence = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [files, setFiles] = useState([]);
  const [evidenceData, setEvidenceData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const fileInputRef = React.useRef();
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [evidenceId, setEvidenceId] = useState("");
  const [caseId, setCaseId] = useState("");
  const [collectedBy, setCollectedBy] = useState("");
  const [typeEvidence, setTypeEvidence] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [status, setStatus] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        if (statusFilter || dateFilter) {
          const result = await filterEvidence({ 
            status: statusFilter, 
            collectedAt: dateFilter,
            page: currentPage,
            pageSize: pageSize
          });
          setEvidenceData(result.data);
          setTotalPages(result.totalPages);
          setTotalCount(result.totalCount);
        } else {
          const result = await getEvidencePaginated(currentPage, pageSize);
          setEvidenceData(result.data);
          setTotalPages(result.totalPages);
          setTotalCount(result.totalCount);
        }
      } catch (error) {
        console.error('Failed to fetch evidence:', error);
      }
    };
    fetchEvidence();
  }, [currentPage, pageSize, statusFilter, dateFilter]);

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  const removeFile = idx => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  const handleUploadClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Validate function for evidence form
  const validateEvidenceForm = () => {
    if (!evidenceId.trim()) return "Evidence ID is required.";
    if (!/^E\d{3}$/.test(evidenceId)) return "Evidence ID must be in format E followed by 3 digits (e.g., E001, E002).";
    if (!typeEvidence.trim()) return "Type of Evidence is required.";
    if (!desc.trim()) return "Description is required.";
    if (desc.length < 10 || desc.length > 500) return "Description must be between 10 and 500 characters.";
    if (!date) return "Date collected is required.";
    if (new Date(date) > new Date()) return "Date collected cannot be in the future.";
    if (!collectedBy.trim()) return "Collector is required.";
    if (!currentLocation.trim()) return "Current Location is required.";
    if (currentLocation.length > 100) return "Current Location must be at most 100 characters.";
    if (!caseId.trim()) return "Case ID is required.";
    return null;
  };

  const handleCreateEvidence = async (e) => {
    e.preventDefault();
    const error = validateEvidenceForm();
    if (error) {
      setFormError(error);
      return;
    }
    setFormError("");
    try {
      await createEvidence({
        evidenceId,
        caseId,
        description: desc,
        collectedAt: date,
        collectedBy,
        typeEvidence,
        currentLocation,
        attachedFile: files[0]?.name || "",
        status
      });
      setShowPopup(false);
      setEvidenceId(""); setCaseId(""); setDesc(""); setDate(""); setCollectedBy(""); setTypeEvidence(""); setCurrentLocation(""); setFiles([]); setStatus("");
      // reload data
      const result = await getEvidencePaginated(currentPage, pageSize);
      setEvidenceData(result.data);
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
    } catch (err) {
      // Parse backend error if possible
      let msg = 'Failed to create evidence!';
      if (err?.response?.data) {
        if (typeof err.response.data === 'string') msg = err.response.data;
        else if (err.response.data?.errors) msg = Object.values(err.response.data.errors).join(' ');
        else if (err.response.data?.message) msg = err.response.data.message;
      }
      setFormError(msg);
    }
  };

  return (
    <div className="investigation-container">
      <Sidebar />
      <main className="investigation-main">
        <header className="investigation-header">
          <h1>List of evidence</h1>
        </header>
        <section className="section">
          <div className="section-box">
            <div className="section-title-row">
              <button className="btn-back" onClick={() => navigate(-1)}>BACK <img src="/icons/Back.png" alt="back" className="icon-back" /></button>
              <div style={{ flex: 1 }} />
              <button className="btn-add" onClick={() => setShowPopup(true)}><img src="/icons/add_circle.svg" alt="add" className="icon-add" /> ADD</button>
            </div>
            <div className="filter-row">
              <div>
                <label>Status</label>
                <select 
                  className="filter-select" 
                  value={statusFilter} 
                  onChange={e => { 
                    setStatusFilter(e.target.value); 
                    handleFilterChange(); 
                  }}
                >
                  <option value="">Select an option</option>
                  <option value="Waiting for Test">Waiting for Test</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Tested">Tested</option>
                </select>
              </div>
              <div>
                <label>Date collected</label>
                <input 
                  type="date" 
                  className="filter-date" 
                  value={dateFilter} 
                  onChange={e => { 
                    setDateFilter(e.target.value); 
                    handleFilterChange(); 
                  }} 
                  placeholder="Select a day" 
                />
              </div>
            </div>
            <table className="info-table">
              <thead>
                <tr>
                  <th>Evidence ID</th>
                  <th>Case ID</th>
                  <th>Description</th>
                  <th>Date collected</th>
                  <th>Collector</th>
                  <th>Status</th>
                  <th>Detail file</th>
                </tr>
              </thead>
              <tbody>
                {evidenceData.map((row, idx) => (
                  <tr key={row.id || idx}>
                    <td>{row.id || row.evidenceId}</td>
                    <td>{row.caseId}</td>
                    <td>{row.desc || row.description}</td>
                    <td>{row.collectedAt ? new Date(row.collectedAt).toLocaleDateString() : (row.date || row.dateCollected)}</td>
                    <td>{row.collector || row.collectorName}</td>
                    <td><span className={statusClass(row.status)}>{row.status}</span></td>
                    <td><a href="#" onClick={e => { e.preventDefault(); navigate(`/evidence/${row.evidenceId || row.id}`); }}>See details</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-row">
              <span>Show <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select> entries</span>
              <div className="pagination">
                <button 
                  className="page-btn" 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page}
                    className={`page-btn ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  className="page-btn" 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-header">
              <h2>Add new evidence</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            </div>
            <form onSubmit={handleCreateEvidence}>
              <div className="form-group">
                <label>Evidence ID</label>
                <input type="text" value={evidenceId} onChange={e => setEvidenceId(e.target.value)} placeholder="E001" />
              </div>
              <div className="form-group">
                <label>Case ID</label>
                <input type="text" value={caseId} onChange={e => setCaseId(e.target.value)} placeholder="Case ID" />
              </div>
              <div className="form-group">
                <label>Type of Evidence</label>
                <input type="text" value={typeEvidence} onChange={e => setTypeEvidence(e.target.value)} placeholder="Type of Evidence" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
              </div>
              <div className="form-group">
                <label>Date collected</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Collector</label>
                <input type="text" value={collectedBy} onChange={e => setCollectedBy(e.target.value)} placeholder="Collector" />
              </div>
              <div className="form-group">
                <label>Current Location</label>
                <input type="text" value={currentLocation} onChange={e => setCurrentLocation(e.target.value)} placeholder="Current Location" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="">Select Status</option>
                  <option value="Waiting for Test">Waiting for Test</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Tested">Tested</option>
                </select>
              </div>
              <div className="form-group">
                <label>Attached File</label>
                <div className="file-upload">
                  <button type="button" onClick={handleUploadClick}>Choose File</button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <span>{files.length > 0 ? `${files.length} file(s) selected` : 'No file chosen'}</span>
                </div>
                {files.length > 0 && (
                  <div className="file-list">
                    {files.map((file, idx) => (
                      <div key={idx} className="file-item">
                        <span>{file.name}</span>
                        <button type="button" onClick={() => removeFile(idx)}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {formError && <div className="error-message">{formError}</div>}
              <div className="form-actions">
                <button type="submit" className="btn-submit">Create Evidence</button>
                <button type="button" className="btn-cancel" onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evidence; 
