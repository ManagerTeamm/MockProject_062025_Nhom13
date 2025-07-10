import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import '../styles/investigation.css';
import '../styles/evidence.css';

const interviewData = [
  { caseId: '#E0462', interviewId: '#E0462', nameInterviewee: 'Jack Son', nameInterviewer: 'John Tran', location: 'Room 202 - C4', typeInterviewee: 'Suspect', startTime: '1h00 am 20/2/2025', endTime: '2h00 am 20/2/2025', qa: true },
  { caseId: '#E0462', interviewId: '#E0462', nameInterviewee: 'Jack Tri', nameInterviewer: 'Jack Tran', location: 'Room 201 - C4', typeInterviewee: 'Victim', startTime: '1h00 am 20/2/2025', endTime: '2h30 am 20/2/2025', qa: true },
  { caseId: '#E0462', interviewId: '#E0462', nameInterviewee: 'Jack Son', nameInterviewer: 'John Tran', location: 'Room 202 - C4', typeInterviewee: 'Suspect', startTime: '1h00 am 21/2/2025', endTime: '2h00 am 21/2/2025', qa: true },
  { caseId: '#E0462', interviewId: '#E0462', nameInterviewee: 'Jack Tri', nameInterviewer: 'Jack Tran', location: 'Room 201 - C4', typeInterviewee: 'Victim', startTime: '1h00 am 21/2/2025', endTime: '2h30 am 21/2/2025', qa: true },
];

const intervieweeOptions = [
  { value: '1', label: 'Jack Son' },
  { value: '2', label: 'Jack Tri' },
];
const typeOptions = [
  { value: 'Suspect', label: 'Suspect' },
  { value: 'Victim', label: 'Victim' },
];

const initialQA = [
  { question: 'abc', answer: 'abc', trust: 'a' },
  { question: 'acaa', answer: 'abc', trust: 'b' },
  { question: 'aklfsa', answer: 'abc', trust: 'c' },
];

const InterviewsList = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = 3;
  const [showPopup, setShowPopup] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [typeInterviewee, setTypeInterviewee] = useState('');
  const [idInterviewee, setIdInterviewee] = useState('');
  const [nameInterviewee, setNameInterviewee] = useState('');
  const [files, setFiles] = useState([]);
  const [qaList, setQaList] = useState(initialQA);
  const fileInputRef = useRef();
  const [showQAPopup, setShowQAPopup] = useState(false);
  const [qaForm, setQaForm] = useState({ trust: '', question: '', answer: '' });
  const trustOptions = [
    { value: 'a', label: 'a' },
    { value: 'b', label: 'b' },
    { value: 'c', label: 'c' },
  ];

  const filteredData = interviewData.filter(row => {
    const statusMatch = statusFilter ? row.typeInterviewee === statusFilter : true;
    const dateMatch = dateFilter ? row.startTime.includes(dateFilter) : true;
    return statusMatch && dateMatch;
  });

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
          <h1>List of interviews</h1>
        </header>
        <section className="section">
          <div className="section-box">
            <div className="section-title-row" style={{marginBottom: 24}}>
              <button className="btn-back" onClick={() => navigate(-1)}>BACK <img src="/icons/Back.png" alt="back" className="icon-back" /></button>
              <div style={{ flex: 1 }} />
              <button className="btn-add" onClick={() => setShowPopup(true)}><img src="/icons/add_circle.svg" alt="add" className="icon-add" /> ADD</button>
            </div>
            <div className="filter-row" style={{marginBottom: 24}}>
              <div>
                <label>Status</label>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="">Select an option</option>
                  <option value="Suspect">Suspect</option>
                  <option value="Victim">Victim</option>
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
                  <th>Interview ID</th>
                  <th>Name interviewee</th>
                  <th>Name interviewer</th>
                  <th>Location</th>
                  <th>Type of interviewee</th>
                  <th>Start time</th>
                  <th>End time</th>
                  <th>Q&A</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.caseId}</td>
                    <td>{row.interviewId}</td>
                    <td>{row.nameInterviewee}</td>
                    <td>{row.nameInterviewer}</td>
                    <td>{row.location}</td>
                    <td>{row.typeInterviewee}</td>
                    <td>{row.startTime}</td>
                    <td>{row.endTime}</td>
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
      </main>
      {showPopup && (
        <div className="popup-overlay" style={{zIndex: 1000}}>
          <div className="popup-form hide-scrollbar" style={{maxWidth: 800, width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', paddingBottom: 24}}>
            <h2 className="popup-title" style={{textAlign:'center', color:'#23294B'}}>Add the information for the interview</h2>
            <div className="popup-sub" style={{textAlign:'center', marginBottom: 24}}>This form is used to record the information for the interview</div>
            <form onSubmit={e => { e.preventDefault(); setShowPopup(false); }}>
              <div style={{display:'flex', gap: 24, marginBottom: 24}}>
                <div style={{flex:1}}>
                  <label>Start time <span style={{color:'red'}}>*</span></label>
                  <input type="datetime-local" className="popup-date" value={startTime} onChange={e => setStartTime(e.target.value)} required />
                </div>
                <div style={{flex:1}}>
                  <label>End time <span style={{color:'red'}}>*</span></label>
                  <input type="datetime-local" className="popup-date" value={endTime} onChange={e => setEndTime(e.target.value)} required />
                </div>
              </div>
              <div style={{display:'flex', gap: 24, marginBottom: 24}}>
                <div style={{flex:1}}>
                  <label>Location</label>
                  <input type="text" className="popup-date" value={location} onChange={e => setLocation(e.target.value)} placeholder="Text" style={{width:'100%'}} />
                </div>
                <div style={{flex:1}}>
                  <label>Type of interviewee</label>
                  <select className="popup-date" value={typeInterviewee} onChange={e => setTypeInterviewee(e.target.value)} style={{width:'100%'}}>
                    <option value="">Select an option</option>
                    {typeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
              </div>
              <div style={{display:'flex', gap: 24, marginBottom: 24}}>
                <div style={{flex:1}}>
                  <label>ID Interviewee</label>
                  <input type="text" className="popup-date" value={idInterviewee} onChange={e => setIdInterviewee(e.target.value)} placeholder="Text" style={{width:'100%'}} />
                </div>
                <div style={{flex:1}}>
                  <label>Interviewee name</label>
                  <select className="popup-date" value={nameInterviewee} onChange={e => setNameInterviewee(e.target.value)} style={{width:'100%'}}>
                    <option value="">Select an option</option>
                    {intervieweeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
              </div>
              <div style={{marginBottom: 24}}>
                <label style={{fontWeight:500}}>Audio & video about the interview</label>
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
                <label style={{fontWeight:500}}>Question and answer for interview</label>
                <button type="button" className="btn-add" style={{float:'right', marginBottom:8}} onClick={() => setShowQAPopup(true)}>
                  ADD <img src="/icons/add_circle.svg" alt="add" className="icon-add" />
                </button>
                <table className="info-table">
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Answer</th>
                      <th>Level of trust</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {qaList.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.question}</td>
                        <td>{row.answer}</td>
                        <td>{row.trust}</td>
                        <td>
                          <button type="button" className="btn-edit"><img src="/icons/Create.svg" alt="edit" className="icon-create" /></button>
                          <button type="button" className="btn-delete"><img src="/icons/Delete.svg" alt="delete" className="icon-delete" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="popup-btn-row" style={{justifyContent:'center', gap:24}}>
                <button type="button" className="popup-cancel" onClick={()=>setShowPopup(false)} style={{minWidth:120}}>Cancel</button>
                <button type="submit" className="popup-create" style={{minWidth:120}}>Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showQAPopup && (
        <div className="popup-overlay" style={{zIndex: 1100}}>
          <div className="popup-form" style={{maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', paddingBottom: 24}}>
            <h2 className="popup-title" style={{textAlign:'center', color:'#23294B'}}>Add the questions and answers for interview</h2>
            <div className="popup-sub" style={{textAlign:'center', marginBottom: 24}}>This form is used to record the questions and answers for interview</div>
            <form onSubmit={e => { e.preventDefault(); setShowQAPopup(false); }}>
              <div style={{marginBottom: 24}}>
                <label>Level of trust</label>
                <select className="popup-date" value={qaForm.trust} onChange={e => setQaForm(f => ({...f, trust: e.target.value}))} style={{width:'100%'}}>
                  <option value="">Select an option</option>
                  {trustOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div style={{marginBottom: 24}}>
                <label>Question</label>
                <input type="text" className="popup-date" value={qaForm.question} onChange={e => setQaForm(f => ({...f, question: e.target.value}))} placeholder="Text" style={{width:'100%'}} />
              </div>
              <div style={{marginBottom: 24}}>
                <label>Answer</label>
                <input type="text" className="popup-date" value={qaForm.answer} onChange={e => setQaForm(f => ({...f, answer: e.target.value}))} placeholder="Text" style={{width:'100%'}} />
              </div>
              <div className="popup-btn-row" style={{justifyContent:'center', gap:24}}>
                <button type="button" className="popup-cancel" onClick={()=>setShowQAPopup(false)} style={{minWidth:120}}>Cancel</button>
                <button type="submit" className="popup-create" style={{minWidth:120}}>Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewsList; 