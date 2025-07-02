import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import '../styles/investigation.css';

const Investigation = () => {
  const [showRecordPopup, setShowRecordPopup] = useState(false);
  const [recordType, setRecordType] = useState("");
  const [recordDate, setRecordDate] = useState("");
  const [recordSource, setRecordSource] = useState("");
  const [recordDesc, setRecordDesc] = useState("");
  const recordTypes = ["Financial", "Medical", "Other"];
  const [showMeasurePopup, setShowMeasurePopup] = useState(false);
  const [measureType, setMeasureType] = useState("");
  const [measureFiles, setMeasureFiles] = useState([]);
  const [measureResult, setMeasureResult] = useState("");
  const measureTypes = ["Scene Investigation", "Interview", "Other"];
  const measureFileInputRef = React.useRef();
  const handleMeasureFileChange = (e) => {
    setMeasureFiles([...measureFiles, ...Array.from(e.target.files)]);
  };
  const removeMeasureFile = idx => {
    setMeasureFiles(measureFiles.filter((_, i) => i !== idx));
  };
  const handleMeasureUploadClick = () => {
    measureFileInputRef.current && measureFileInputRef.current.click();
  };
  const [showDigitalPopup, setShowDigitalPopup] = useState(false);
  const [digitalType, setDigitalType] = useState("");
  const [digitalTools, setDigitalTools] = useState("");
  const [digitalFiles, setDigitalFiles] = useState([]);
  const [digitalResult, setDigitalResult] = useState("");
  const digitalTypes = ["Phone", "Laptop", "Other"];
  const digitalFileInputRef = React.useRef();
  const handleDigitalFileChange = (e) => {
    setDigitalFiles([...digitalFiles, ...Array.from(e.target.files)]);
  };
  const removeDigitalFile = idx => {
    setDigitalFiles(digitalFiles.filter((_, i) => i !== idx));
  };
  const handleDigitalUploadClick = () => {
    digitalFileInputRef.current && digitalFileInputRef.current.click();
  };

  return (
    <div className="investigation-container">
      <Sidebar />
      <main className="investigation-main">
        <header className="investigation-header">
          <h1>Investigation results and analyst</h1>
          <div className="case-info">
            <div><b>CaseID:</b> <span className="case-id">#20462</span></div>
            <div><b>Status:</b> <span className="case-status warning"> ....</span></div>
            <div><b>Name:</b> <span className="case-name">Murder case of hotel Marriott</span></div>
          </div>
        </header>
        <section className="section">
          <h2>PHYSICAL EVIDENCE</h2>
          <div className="section-box">
            <div className="section-title-row">
              <span>COLLECTED RECORDS INFORMATION</span>
              <button className="btn-add" onClick={() => setShowRecordPopup(true)}><img src="/icons/add_circle.svg" alt="add" className="icon-add" /> ADD</button>
            </div>
            <table className="info-table">
              <thead>
                <tr>
                  <th>Type of record</th>
                  <th>Source of the record</th>
                  <th>Date of collection</th>
                  <th>Summary of important record content</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Financial</td>
                  <td>From ACC Bank</td>
                  <td>24/2/2025</td>
                  <td><b>Nothing unusual</b></td>
                  <td>
                    <button className="btn-edit"><img src="/icons/Create.svg" alt="edit" className="icon-create" /></button>
                    <button className="btn-delete"><img src="/icons/Delete.svg" alt="delete" className="icon-delete" /></button>
                  </td>
                </tr>
                <tr>
                  <td>Financial</td>
                  <td>From ACB Bank</td>
                  <td>24/2/2025</td>
                  <td>Abcsajdasdasdas</td>
                  <td>
                    <button className="btn-edit"><img src="/icons/Create.svg" alt="edit" className="icon-create" /></button>
                    <button className="btn-delete"><img src="/icons/Delete.svg" alt="delete" className="icon-delete" /></button>
                  </td>
                </tr>
                <tr>
                  <td>Medical</td>
                  <td>From KZAT hospital</td>
                  <td>24/2/2025</td>
                  <td>Abcsajdasdasdas</td>
                  <td>
                    <button className="btn-edit"><img src="/icons/Create.svg" alt="edit" className="icon-create" /></button>
                    <button className="btn-delete"><img src="/icons/Delete.svg" alt="delete" className="icon-delete" /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="section">
          <div className="section-box">
            <div className="section-title-row">
              <span>INFORMATION ABOUT INVESTIGATIVE MEASURE</span>
              <button className="btn-add" onClick={() => setShowMeasurePopup(true)}><img src="/icons/add_circle.svg" alt="add" className="icon-add" /> ADD</button>
            </div>
            <table className="info-table">
              <thead>
                <tr>
                  <th>Type of investigative measure</th>
                  <th>Order or approval for implementation</th>
                  <th>Results</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Directly to the scene</td>
                  <td><a href="#">Link</a></td>
                  <td>Nothing unusual</td>
                  <td>
                    <button className="btn-edit"><img src="/icons/Create.svg" alt="edit" className="icon-create" /></button>
                    <button className="btn-delete"><img src="/icons/Delete.svg" alt="delete" className="icon-delete" /></button>
                  </td>
                </tr>
                <tr>
                  <td>Directly to the scene</td>
                  <td><a href="#">Link</a></td>
                  <td>Abcsajdasdasdas</td>
                  <td>
                    <button className="btn-edit"><img src="/icons/Create.svg" alt="edit" className="icon-create" /></button>
                    <button className="btn-delete"><img src="/icons/Delete.svg" alt="delete" className="icon-delete" /></button>
                  </td>
                </tr>
                <tr>
                  <td>Directly to the scene</td>
                  <td><a href="#">Link</a></td>
                  <td>Abcsajdasdasdas</td>
                  <td>
                    <button className="btn-edit"><img src="/icons/Create.svg" alt="edit" className="icon-create" /></button>
                    <button className="btn-delete"><img src="/icons/Delete.svg" alt="delete" className="icon-delete" /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="section">
          <div className="section-box">
            <div className="section-title-row">
              <span>FINANCIAL INVESTIGATION INFORMATION</span>
              <button className="btn-upload">Upload file</button>
            </div>
            
          </div>
        </section>
        <section className="section">
          <div className="section-box">
            <div className="section-title-row">
              <span>DIGITAL INVESTIGATION INFORMATION</span>
              <button className="btn-add" onClick={() => setShowDigitalPopup(true)}><img src="/icons/add_circle.svg" alt="add" className="icon-add" /> ADD</button>
            </div>
            <table className="info-table">
              <thead>
                <tr>
                  <th>Type of device/data analyzed</th>
                  <th>Analysis tools and methods</th>
                  <th>Analysis Results</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>abcdas</td>
                  <td>absssc</td>
                  <td><a href="#">Link</a></td>
                  <td>
                    <button className="btn-edit"><img src="/icons/Create.svg" alt="edit" className="icon-create" /></button>
                    <button className="btn-delete"><img src="/icons/Delete.svg" alt="delete" className="icon-delete" /></button>
                  </td>
                </tr>
                <tr>
                  <td>acaa</td>
                  <td>abc</td>
                  <td><a href="#">Link</a></td>
                  <td>
                    <button className="btn-edit"><img src="/icons/Create.svg" alt="edit" className="icon-create" /></button>
                    <button className="btn-delete"><img src="/icons/Delete.svg" alt="delete" className="icon-delete" /></button>
                  </td>
                </tr>
                <tr>
                  <td>aklfsaas</td>
                  <td>abc</td>
                  <td><a href="#">Link</a></td>
                  <td>
                    <button className="btn-edit"><img src="/icons/Create.svg" alt="edit" className="icon-create" /></button>
                    <button className="btn-delete"><img src="/icons/Delete.svg" alt="delete" className="icon-delete" /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="section">
          <div className="section-box">
            <div className="section-title-row">
              <span>SUSPECTS</span>
              <button className="btn-list">
                <img src="/icons/calendar_today.svg" alt="calendar" className="icon-calendar" /> LIST
              </button>
            </div>
          </div>
        </section>
        <footer className="investigation-footer">
          <button className="btn-back">Back</button>
          <button className="btn-not-approved">Not approved</button>
          <button className="btn-accept">Accept</button>
        </footer>
      </main>
      {showRecordPopup && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h2 className="popup-title">Add the record of information</h2>
            <div className="popup-sub">This form is used to record during a crime investigation.</div>
            <form onSubmit={e => { e.preventDefault(); setShowRecordPopup(false); }}>
              <div style={{display:'flex', gap: '24px', marginBottom: 22}}>
                <div style={{flex:1}}>
                  <label>Type of record <span style={{color:'red'}}>*</span></label><br />
                  <select className="popup-date" value={recordType} onChange={e => setRecordType(e.target.value)} required>
                    <option value="">Select an option</option>
                    {recordTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div style={{flex:1}}>
                  <label>Date of collection <span style={{color:'red'}}>*</span></label><br />
                  <input type="date" className="popup-date" value={recordDate} onChange={e => setRecordDate(e.target.value)} required />
                </div>
              </div>
              <div className="form-group">
                <label>Source of record</label><br />
                <input className="popup-date" style={{width:'100%'}} value={recordSource} onChange={e => setRecordSource(e.target.value)} placeholder="Text" />
              </div>
              <div className="form-group">
                <label>Evidence Description</label><br />
                <textarea className="popup-desc" value={recordDesc} onChange={e => setRecordDesc(e.target.value)} placeholder="Provide a summary to document the investigation"></textarea>
              </div>
              <div className="popup-btn-row">
                <button type="button" className="popup-cancel" onClick={()=>setShowRecordPopup(false)}>Cancel</button>
                <button type="submit" className="popup-create">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showMeasurePopup && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h2 className="popup-title">Add the information about the investigative measure</h2>
            <div className="popup-sub">This form is used to record the investigative measures for the case</div>
            <form onSubmit={e => { e.preventDefault(); setShowMeasurePopup(false); }}>
              <div className="form-group">
                <label>Type of investigative measure <span style={{color:'red'}}>*</span></label><br />
                <select className="popup-date" value={measureType} onChange={e => setMeasureType(e.target.value)} required>
                  <option value="">Select an option</option>
                  {measureTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Attachments</label>
                <div className="popup-upload-box">
                  <input type="file" multiple style={{display:'none'}} ref={measureFileInputRef} onChange={handleMeasureFileChange} />
                  <div className="popup-drop-area" onClick={handleMeasureUploadClick}>
                    <div style={{textAlign:'center',color:'#6c63ff'}}>
                      <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z" fill="#F5F6FA"/><path d="M24 14v14m0 0 6-6m-6 6-6-6" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="4" width="40" height="40" rx="20" stroke="#6c63ff" strokeWidth="2"/></svg>
                      <div>Drag & drop files or <span style={{color:'#6c63ff',textDecoration:'underline',cursor:'pointer'}}>Browse</span></div>
                      <div style={{fontSize:'12px',color:'#888'}}>Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</div>
                    </div>
                  </div>
                </div>
                <button type="button" className="popup-upload-btn" onClick={handleMeasureUploadClick}>Upload file</button>
                <div className="popup-uploaded-label">Uploaded:</div>
                <div className="popup-uploaded-list">
                  {measureFiles.map((file, idx) => (
                    <div className="popup-uploaded-item" key={idx}>
                      <img src="/icons/png-icon.png" alt="filetype" style={{width:24,marginRight:8}} />
                      <span>{file.name}</span>
                      <span className="popup-file-size">{(file.size/1024).toFixed(0)} KB, {new Date().toLocaleDateString()}</span>
                      <button type="button" className="popup-file-remove" onClick={()=>removeMeasureFile(idx)}>×</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Results</label><br />
                <textarea className="popup-desc" value={measureResult} onChange={e => setMeasureResult(e.target.value)} placeholder="Provide a summary to document the results of the investigative measure"></textarea>
              </div>
              <div className="popup-btn-row">
                <button type="button" className="popup-cancel" onClick={()=>setShowMeasurePopup(false)}>Cancel</button>
                <button type="submit" className="popup-create">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDigitalPopup && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h2 className="popup-title">Add the digital investigation information</h2>
            <div className="popup-sub">This form is used to record the digital investigation information</div>
            <form onSubmit={e => { e.preventDefault(); setShowDigitalPopup(false); }}>
              <div style={{display:'flex', gap: '24px', marginBottom: 22}}>
                <div style={{flex:1}}>
                  <label>Type of device/data analyzed <span style={{color:'red'}}>*</span></label><br />
                  <select className="popup-date" value={digitalType} onChange={e => setDigitalType(e.target.value)} required>
                    <option value="">Select an option</option>
                    {digitalTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div style={{flex:1}}>
                  <label>Analysis tools and methods</label><br />
                  <input className="popup-date" style={{width:'100%'}} value={digitalTools} onChange={e => setDigitalTools(e.target.value)} placeholder="Text" />
                </div>
              </div>
              <div className="form-group">
                <label>Analysis Results</label>
                <div className="popup-upload-box">
                  <input type="file" multiple style={{display:'none'}} ref={digitalFileInputRef} onChange={handleDigitalFileChange} />
                  <div className="popup-drop-area" onClick={handleDigitalUploadClick}>
                    <div style={{textAlign:'center',color:'#6c63ff'}}>
                      <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z" fill="#F5F6FA"/><path d="M24 14v14m0 0 6-6m-6 6-6-6" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="4" width="40" height="40" rx="20" stroke="#6c63ff" strokeWidth="2"/></svg>
                      <div>Drag & drop files or <span style={{color:'#6c63ff',textDecoration:'underline',cursor:'pointer'}}>Browse</span></div>
                      <div style={{fontSize:'12px',color:'#888'}}>Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</div>
                    </div>
                  </div>
                </div>
                <button type="button" className="popup-upload-btn" onClick={handleDigitalUploadClick}>Upload file</button>
                <div className="popup-uploaded-label">Uploaded:</div>
                <div className="popup-uploaded-list">
                  {digitalFiles.map((file, idx) => (
                    <div className="popup-uploaded-item" key={idx}>
                      <img src="/icons/png-icon.png" alt="filetype" style={{width:24,marginRight:8}} />
                      <span>{file.name}</span>
                      <span className="popup-file-size">{(file.size/1024).toFixed(0)} KB, {new Date().toLocaleDateString()}</span>
                      <button type="button" className="popup-file-remove" onClick={()=>removeDigitalFile(idx)}>×</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <textarea className="popup-desc" value={digitalResult} onChange={e => setDigitalResult(e.target.value)} placeholder="Provide a summary to document the results of the digital investigation"></textarea>
              </div>
              <div className="popup-btn-row">
                <button type="button" className="popup-cancel" onClick={()=>setShowDigitalPopup(false)}>Cancel</button>
                <button type="submit" className="popup-create">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investigation; 