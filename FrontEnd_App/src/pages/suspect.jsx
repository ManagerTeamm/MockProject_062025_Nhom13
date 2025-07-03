import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import '../styles/investigation.css';
import '../styles/evidence.css';

const suspectData = [
  { caseId: '#E0462', suspectId: '#20462', fullname: 'John Tran', address: '218 N 7th St, Harlingen, TX', history: 'acacac', interview: true, status: 'Waiting for Test', apprehension: true },
  { caseId: '#E0461', suspectId: '#20462', fullname: 'Jack Tran', address: '218 N 7th St, Harlingen, TX', history: 'as', interview: true, status: 'Waiting for Test', apprehension: true },
  { caseId: '#E0460', suspectId: '#20462', fullname: 'Tom Tran', address: '218 N 7th St, Harlingen, TX', history: 'basjdhjsad', interview: true, status: 'Waiting for Test', apprehension: true },
  { caseId: '#E0222', suspectId: '#20400', fullname: 'Tony Tran', address: '218 N 7th St, Harlingen, TX', history: 'd', interview: true, status: 'In Progress', apprehension: true },
  { caseId: '#34304', suspectId: '#20400', fullname: 'Maria Ton', address: '218 N 7th St, Harlingen, TX', history: 'e', interview: true, status: 'In Progress', apprehension: true },
  { caseId: '#17188', suspectId: '#20400', fullname: 'amcidjfa', address: '218 N 7th St, Harlingen, TX', history: 'ấcvfdhbbbbbb', interview: true, status: 'Tested', apprehension: true },
  { caseId: '#73003', suspectId: '#20400', fullname: 'amcidjfa', address: '218 N 7th St, Harlingen, TX', history: 'bbbbbbbbbbbbbb', interview: true, status: 'Waiting for Test', apprehension: true },
  { caseId: '#58825', suspectId: '#202222', fullname: 'amcidjfainor', address: '218 N 7th St, Harlingen, TX', history: 'bbbbbbbbbbbb', interview: true, status: 'Waiting for Test', apprehension: true },
  { caseId: '#89094', suspectId: '#202222', fullname: 'amcidjfa', address: '218 N 7th St, Harlingen, TX', history: 'fsdfasdfs', interview: true, status: 'Tested', apprehension: true },
];

const statusClass = status => {
  if (status === 'Waiting for Test') return 'status-waiting';
  if (status === 'In Progress') return 'status-progress';
  if (status === 'Tested') return 'status-tested';
  return '';
};

const Suspect = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState("");
  const fileInputRef = React.useRef();

  // Pagination giả lập
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = 3;

  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };
  const removeFile = idx => {
    setFiles(files.filter((_, i) => i !== idx));
  };
  const handleUploadClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  return (
    <div className="investigation-container">
      <Sidebar />
      <main className="investigation-main">
        <header className="investigation-header">
          <h1>List of suspect</h1>
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
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="">Select an option</option>
                  <option value="Waiting for Test">Waiting for Test</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Tested">Tested</option>
                </select>
              </div>
              <div>
                <label>Date collected</label>
                <input type="date" className="filter-date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} placeholder="Select a day" />
              </div>
            </div>
            <table className="info-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Suspect ID</th>
                  <th>Fullname</th>
                  <th>Address</th>
                  <th>Criminal history</th>
                  <th>Results interviews</th>
                  <th>Status</th>
                  <th>Information about the apprehension</th>
                </tr>
              </thead>
              <tbody>
                {suspectData.map((row, idx) => (
                  <tr key={row.caseId + row.suspectId}>
                    <td>{row.caseId}</td>
                    <td>{row.suspectId}</td>
                    <td>{row.fullname}</td>
                    <td>{row.address}</td>
                    <td>{row.history}</td>
                    <td><a href="#">See details</a></td>
                    <td><span className={statusClass(row.status)}>{row.status}</span></td>
                    <td><a href="#">See details</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <div className="popup-form" style={{maxWidth: 800, width: '100%'}}>
              <h2 className="popup-title" style={{textAlign:'center', color:'#23294B'}}>Add the suspect information</h2>
              <div className="popup-sub" style={{textAlign:'center', marginBottom: 24}}>This form is used to record the suspect information</div>
              <form onSubmit={e => { e.preventDefault(); setShowPopup(false); }}>
                <div style={{display:'flex', gap: 24, marginBottom: 24}}>
                  <div style={{flex:1}}>
                    <label>Full name</label>
                    <input type="text" className="popup-date" value={fullname} onChange={e => setFullname(e.target.value)} placeholder="Text" style={{width:'100%'}} />
                  </div>
                  <div style={{flex:1}}>
                    <label>Address</label>
                    <input type="text" className="popup-date" value={address} onChange={e => setAddress(e.target.value)} placeholder="Text" style={{width:'100%'}} />
                  </div>
                </div>
                <div style={{marginBottom: 24}}>
                  <label style={{fontWeight:500}}>Results interviews & Information about the apprehension</label>
                  <div className="popup-upload-box" style={{marginTop:8}}>
                    <input type="file" multiple style={{display:'none'}} ref={fileInputRef} onChange={handleFileChange} />
                    <div className="popup-drop-area" onClick={handleUploadClick} style={{padding:'32px 0'}}>
                      <div style={{textAlign:'center',color:'#6c63ff'}}>
                        <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z" fill="#F5F6FA"/><path d="M24 14v14m0 0 6-6m-6 6-6-6" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="4" width="40" height="40" rx="20" stroke="#6c63ff" strokeWidth="2"/></svg>
                        <div>Drag & drop files or <span style={{color:'#6c63ff',textDecoration:'underline',cursor:'pointer'}}>Browse</span></div>
                        <div style={{fontSize:'12px',color:'#888'}}>Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</div>
                      </div>
                    </div>
                  </div>
                  <div className="popup-uploaded-label" style={{marginTop:12}}>Uploaded:</div>
                  <div className="popup-uploaded-list" style={{display:'flex', gap:16, flexWrap:'wrap'}}>
                    {files.map((file, idx) => (
                      <div className="popup-uploaded-item" key={idx} style={{minWidth:220, background:'#fff', borderRadius:12, boxShadow:'0 2px 8px #0001', padding:12, display:'flex', alignItems:'center', gap:8}}>
                        <img src="/icons/png-icon.png" alt="filetype" style={{width:32,marginRight:8}} />
                        <div style={{flex:1}}>
                          <div style={{fontWeight:500}}>{file.name}</div>
                          <div style={{fontSize:13, color:'#888'}}>{(file.size/1024).toFixed(0)} KB, {new Date().toLocaleDateString()}</div>
                        </div>
                        <button type="button" className="popup-file-remove" onClick={()=>removeFile(idx)} style={{fontSize:20, color:'#888', background:'none', border:'none', cursor:'pointer'}}>×</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{marginBottom: 24}}>
                  <label style={{fontWeight:500}}>More information about suspect</label>
                  <textarea className="popup-desc" value={info} onChange={e => setInfo(e.target.value)} placeholder="Provide more information about suspect" style={{width:'100%', minHeight:100}}></textarea>
                </div>
                <div className="popup-btn-row" style={{justifyContent:'center', gap:24}}>
                  <button type="button" className="popup-cancel" onClick={()=>setShowPopup(false)} style={{minWidth:120}}>Cancel</button>
                  <button type="submit" className="popup-create" style={{minWidth:120}}>Create</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Suspect; 