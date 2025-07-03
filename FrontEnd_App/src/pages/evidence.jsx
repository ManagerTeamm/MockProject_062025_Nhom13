import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import evidenceService from '../services/evidenceService';
import '../styles/investigation.css';
import '../styles/evidence.css';

// Dữ liệu mẫu để fallback khi API chưa sẵn sàng
const fallbackEvidenceData = [
  { evidenceId: '#E0462', caseId: '#20462', description: 'amcidjfa', collectedAt: '2022-05-13', collector: 'Jeames Doan', status: 'Waiting for Test' },
  { evidenceId: '#E0461', caseId: '#20462', description: 'amcidjfa', collectedAt: '2022-05-13', collector: 'John Tran', status: 'Waiting for Test' },
  { evidenceId: '#E0460', caseId: '#20462', description: 'amcidjfa', collectedAt: '2022-05-22', collector: 'Maria Ton', status: 'Waiting for Test' },
];

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
  const [evidences, setEvidences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = React.useRef();

  // Fetch evidences from API
  useEffect(() => {
    const fetchEvidences = async () => {
      try {
        setLoading(true);
        const data = await evidenceService.getAllEvidences();
        setEvidences(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch evidences:', err);
        setError('Failed to load evidences. Using fallback data.');
        // Sử dụng dữ liệu fallback nếu API không hoạt động
        setEvidences(fallbackEvidenceData);
      } finally {
        setLoading(false);
      }
    };

    fetchEvidences();
  }, []);

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  const removeFile = idx => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  const handleUploadClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
  };

  // Handle form submission for creating new evidence
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const evidenceData = {
        caseId: '#20462', // Có thể thêm field để chọn case
        description: desc,
        collectedAt: date,
        collectedBy: 'Current User', // Có thể lấy từ context/auth
        typeEvidence: 'Physical',
        currentLocation: 'Evidence Room',
        attachedFile: files.map(f => f.name).join(','),
        status: 'Waiting for Test'
      };

      await evidenceService.createEvidence(evidenceData);
      
      // Refresh the list
      const updatedEvidences = await evidenceService.getAllEvidences();
      setEvidences(updatedEvidences);
      
      // Reset form
      setShowPopup(false);
      setDate('');
      setDesc('');
      setFiles([]);
    } catch (err) {
      console.error('Failed to create evidence:', err);
      alert('Failed to create evidence. Please try again.');
    }
  };

  return (
    <div className="investigation-container">
      <Sidebar />
      <main className="investigation-main">
        <header className="investigation-header">
          <h1>List of evidence</h1>
          {error && <div style={{color: 'red', fontSize: '14px', marginTop: '10px'}}>{error}</div>}
        </header>
        <section className="section">
          <div className="section-box">
            <div className="section-title-row">
              <button className="btn-back" onClick={() => navigate('/investigation')}>BACK <img src="/icons/Back.png" alt="back" className="icon-back" /></button>
              <div style={{ flex: 1 }} />
              <button className="btn-add" onClick={() => setShowPopup(true)}><img src="/icons/add_circle.svg" alt="add" className="icon-add" /> ADD</button>
            </div>
            <div className="filter-row">
              <div>
                <label>Status</label>
                <select className="filter-select"><option>Select an option</option></select>
              </div>
              <div>
                <label>Date collected</label>
                <input type="date" className="filter-date" placeholder="Select a day" />
              </div>
            </div>
            {loading ? (
              <div style={{textAlign: 'center', padding: '20px'}}>Loading evidences...</div>
            ) : (
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
                  {evidences.map((row, idx) => (
                    <tr key={row.evidenceId || row.id}>
                      <td>{row.evidenceId || row.id}</td>
                      <td>{row.caseId}</td>
                      <td>{row.description || row.desc}</td>
                      <td>{formatDate(row.collectedAt || row.date)}</td>
                      <td>{row.collector}</td>
                      <td><span className={statusClass(row.status)}>{row.status}</span></td>
                      <td><a href="#">See details</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="pagination-row">
              <span>Show <select><option>10</option></select> entries</span>
              <div className="pagination">
                <button className="page-btn">Previous</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">Next</button>
              </div>
            </div>
          </div>
        </section>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-form">
              <h2 className="popup-title">Add the Evidence</h2>
              <div className="popup-sub">This form is used to record evidence during a crime investigation.</div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Date collected <span style={{color:'red'}}>*</span></label><br />
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className="popup-date" required />
                </div>
                <div className="form-group">
                  <label>Summary of important record content</label><br />
                  <textarea className="popup-desc" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Provide a clear and detailed description of the evidence (shape, material, identifying features...)"></textarea>
                </div>
                <div className="form-group">
                  <label>Attachments</label>
                  <div className="popup-upload-box">
                    <input type="file" multiple style={{display:'none'}} ref={fileInputRef} onChange={handleFileChange} />
                    <div className="popup-drop-area" onClick={handleUploadClick}>
                      <div style={{textAlign:'center',color:'#6c63ff'}}>
                        <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z" fill="#F5F6FA"/><path d="M24 14v14m0 0 6-6m-6 6-6-6" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="4" width="40" height="40" rx="20" stroke="#6c63ff" strokeWidth="2"/></svg>
                        <div>Drag & drop files or <span style={{color:'#6c63ff',textDecoration:'underline',cursor:'pointer'}}>Browse</span></div>
                        <div style={{fontSize:'12px',color:'#888'}}>Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</div>
                      </div>
                    </div>
                  </div>
                  <button type="button" className="popup-upload-btn" onClick={handleUploadClick}>Upload file</button>
                  <div className="popup-uploaded-label">Uploaded:</div>
                  <div className="popup-uploaded-list">
                    {files.map((file, idx) => (
                      <div className="popup-uploaded-item" key={idx}>
                        <img src="/icons/png-icon.png" alt="filetype" style={{width:24,marginRight:8}} />
                        <span>{file.name}</span>
                        <span className="popup-file-size">{(file.size/1024).toFixed(0)} KB, {new Date().toLocaleDateString()}</span>
                        <button type="button" className="popup-file-remove" onClick={()=>removeFile(idx)}>×</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="popup-btn-row">
                  <button type="button" className="popup-cancel" onClick={()=>setShowPopup(false)}>Cancel</button>
                  <button type="submit" className="popup-create">Create</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Evidence; 
