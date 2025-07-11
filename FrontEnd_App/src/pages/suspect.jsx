import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import '../styles/investigation.css';
import '../styles/evidence.css';
import { getSuspectList, getSuspectPaginated, filterSuspects, createSuspect } from '../services/suspectService';

const statusClass = status => {
  if (status === 'Waiting for Test') return 'status-waiting';
  if (status === 'In Progress') return 'status-progress';
  if (status === 'Tested') return 'status-tested';
  return '';
};

// Thêm hàm phụ trợ cho label có dấu *
const Required = () => <span style={{color:'red'}}>*</span>;

const Suspect = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [suspectData, setSuspectData] = useState([]);

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [suspectId, setSuspectId] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");
  const [identification, setIdentification] = useState("");
  const [catchTime, setCatchTime] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mugshotUrl, setMugshotUrl] = useState("");
  const [fingerprintHash, setFingerprintHash] = useState("");
  const [healthStatus, setHealthStatus] = useState("");
  const fileInputRef = React.useRef();
  const [mugshotFile, setMugshotFile] = useState(null);

  // Pagination giả lập
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchSuspects = async () => {
      try {
        if (statusFilter || dateFilter) {
          const result = await filterSuspects({ status: statusFilter, catchTime: dateFilter, page, pageSize });
          setSuspectData(result.data);
          setTotalCount(result.totalCount);
          setTotalPages(Math.ceil(result.totalCount / pageSize));
        } else {
          const result = await getSuspectPaginated(page, pageSize);
          setSuspectData(result.data);
          setTotalCount(result.totalCount);
          setTotalPages(Math.ceil(result.totalCount / pageSize));
        }
      } catch (err) {
        setSuspectData([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    };
    fetchSuspects();
  }, [statusFilter, dateFilter, page, pageSize]);

  const validate = async () => {
    const newErrors = {};
    // SuspectId
    if (!suspectId) newErrors.suspectId = 'Suspect ID is required.';
    else if (!/^S\d{3}$/.test(suspectId)) newErrors.suspectId = 'Format: S### (e.g. S001)';

    // Fullname
    if (!fullname) newErrors.fullname = 'Full name is required.';
    else if (fullname.length < 2) newErrors.fullname = 'Min 2 characters.';
    else if (fullname.length > 100) newErrors.fullname = 'Max 100 characters.';
    else if (!/^[A-Za-zÀ-ỹ\s]+$/.test(fullname)) newErrors.fullname = 'Only letters and spaces allowed.';

    // Gender
    if (!gender) newErrors.gender = 'Gender is required.';

    // Dob
    if (!dob) newErrors.dob = 'Date of birth is required.';
    else {
      const dobDate = new Date(dob);
      const age = new Date().getFullYear() - dobDate.getFullYear();
      if (dobDate > new Date(new Date().setFullYear(new Date().getFullYear() - age))) age--;
      if (age < 14) newErrors.dob = 'Age must be at least 14.';
    }

    // Nationality
    if (!nationality) newErrors.nationality = 'Nationality is required.';
    else if (nationality.length < 2) newErrors.nationality = 'Min 2 characters.';

    // Identification
    if (!identification) newErrors.identification = 'Identification is required.';
    else if (!/^\d{9,12}$/.test(identification)) newErrors.identification = 'Must be 9-12 digits.';

    // Catch Time
    if (!catchTime) newErrors.catchTime = 'Catch Time is required.';
    else if (new Date(catchTime) > new Date()) newErrors.catchTime = 'Catch Time must be before now.';

    // Status
    if (!status) newErrors.status = 'Status is required.';

    // Phone number (optional)
    if (phoneNumber && !/^(\+84|0)\d{9}$/.test(phoneNumber)) newErrors.phoneNumber = 'Invalid phone number.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateSuspect = async (e) => {
    e.preventDefault();
    const isValid = await validate();
    if (!isValid) return;
    const suspectData = {
      caseId,
      suspectId,
      fullname,
      gender,
      dob,
      nationality,
      identification,
      catchTime,
      status,
      address,
      description,
      phoneNumber,
      mugshotUrl,
      fingerprintHash,
      healthStatus
    };
    try {
      await createSuspect(suspectData);
      setShowPopup(false);
      // Optionally: refresh list
      setPage(1);
    } catch (err) {
      alert('Failed to create suspect');
    }
  };

  const handleMugshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMugshotFile(file);
      // Nếu backend chưa hỗ trợ upload, dùng URL.createObjectURL để xem trước
      setMugshotUrl(URL.createObjectURL(file));
    }
  };
  const handleMugshotDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setMugshotFile(file);
      setMugshotUrl(URL.createObjectURL(file));
    }
  };
  const handleMugshotBrowse = () => {
    document.getElementById('mugshot-input').click();
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
                <label>Catch Time</label>
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
                  <th>Description</th>
                  <th>Results interviews</th>
                  <th>Status</th>
                  <th>Catch Time</th>
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
                    <td>{row.description}</td>
                    <td><a href="#">See details</a></td>
                    <td><span className={statusClass(row.status)}>{row.status}</span></td>
                    <td>{row.catchTime ? new Date(row.catchTime).toLocaleString() : ''}</td>
                    <td><a href="#">See details</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-row">
              <span>Show <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select> entries</span>
              <div className="pagination">
                <button className="page-btn" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} className={`page-btn ${page === p ? 'active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                ))}
                <button className="page-btn" onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
              </div>
            </div>
          </div>
        </section>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-form" style={{maxWidth: 800, width: '100%'}}>
              <h2 className="popup-title" style={{textAlign:'center', color:'#23294B'}}>Add the suspect information</h2>
              <div className="popup-sub" style={{textAlign:'center', marginBottom: 24}}>This form is used to record the suspect information</div>
              <form onSubmit={handleCreateSuspect}>
                <div style={{display:'flex', gap: 24, marginBottom: 24}}>
                  <div style={{flex:1}}>
                    <label>Case ID <Required /></label>
                    <input type="text" className="popup-date" value={caseId} onChange={e => setCaseId(e.target.value)} placeholder="Case ID" style={{width:'100%'}} />
                  </div>
                  <div style={{flex:1}}>
                    <label>Suspect ID <Required /></label>
                    <input type="text" className="popup-date" value={suspectId} onChange={e => setSuspectId(e.target.value)} placeholder="Suspect ID" style={{width:'100%'}} />
                    {errors.suspectId && <div className="error-text">{errors.suspectId}</div>}
                  </div>
                </div>
                <div style={{display:'flex', gap: 24, marginBottom: 24}}>
                  <div style={{flex:1}}>
                    <label>Full name <Required /></label>
                    <input type="text" className="popup-date" value={fullname} onChange={e => setFullname(e.target.value)} placeholder="Full name" style={{width:'100%'}} />
                    {errors.fullname && <div className="error-text">{errors.fullname}</div>}
                  </div>
                  <div style={{flex:1}}>
                    <label>Gender <Required /></label>
                    <select className="popup-date" value={gender} onChange={e => setGender(e.target.value)} style={{width:'100%'}}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <div className="error-text">{errors.gender}</div>}
                  </div>
                </div>
                <div style={{display:'flex', gap: 24, marginBottom: 24}}>
                  <div style={{flex:1}}>
                    <label>Date of Birth <Required /></label>
                    <input type="date" className="popup-date" value={dob} onChange={e => setDob(e.target.value)} style={{width:'100%'}} />
                    {errors.dob && <div className="error-text">{errors.dob}</div>}
                  </div>
                  <div style={{flex:1}}>
                    <label>Nationality <Required /></label>
                    <input type="text" className="popup-date" value={nationality} onChange={e => setNationality(e.target.value)} placeholder="Nationality" style={{width:'100%'}} />
                    {errors.nationality && <div className="error-text">{errors.nationality}</div>}
                  </div>
                </div>
                <div style={{display:'flex', gap: 24, marginBottom: 24}}>
                  <div style={{flex:1}}>
                    <label>Identification <Required /></label>
                    <input type="text" className="popup-date" value={identification} onChange={e => setIdentification(e.target.value)} placeholder="Identification" style={{width:'100%'}} />
                    {errors.identification && <div className="error-text">{errors.identification}</div>}
                  </div>
                  <div style={{flex:1}}>
                    <label>Catch Time <Required /></label>
                    <input type="datetime-local" className="popup-date" value={catchTime} onChange={e => setCatchTime(e.target.value)} style={{width:'100%'}} />
                    {errors.catchTime && <div className="error-text">{errors.catchTime}</div>}
                  </div>
                </div>
                <div style={{display:'flex', gap: 24, marginBottom: 24}}>
                  <div style={{flex:1}}>
                    <label>Status <Required /></label>
                    <select className="popup-date" value={status} onChange={e => setStatus(e.target.value)} style={{width:'100%'}}>
                      <option value="">Select status</option>
                      <option value="Waiting for Test">Waiting for Test</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Tested">Tested</option>
                    </select>
                    {errors.status && <div className="error-text">{errors.status}</div>}
                  </div>
                  <div style={{flex:1}}>
                    <label>Address</label>
                    <input type="text" className="popup-date" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" style={{width:'100%'}} />
                  </div>
                </div>
                <div style={{marginBottom: 24}}>
                  <label>Description</label>
                  <textarea className="popup-desc" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" style={{width:'100%', minHeight:60}}></textarea>
                </div>
                <div style={{display:'flex', gap: 24, marginBottom: 24}}>
                  <div style={{flex:1}}>
                    <label>Mugshot</label>
                    <div className="popup-upload-box" style={{marginTop:8}}>
                      <input id="mugshot-input" type="file" accept="image/*" style={{display:'none'}} onChange={handleMugshotChange} />
                      <div className="popup-drop-area" onClick={handleMugshotBrowse} onDrop={handleMugshotDrop} onDragOver={e => e.preventDefault()} style={{padding:'32px 0', cursor:'pointer'}}>
                        <div style={{textAlign:'center',color:'#6c63ff'}}>
                          <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z" fill="#F5F6FA"/><path d="M24 14v14m0 0 6-6m-6 6-6-6" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="4" width="40" height="40" rx="20" stroke="#6c63ff" strokeWidth="2"/></svg>
                          <div>Drag & drop files or <span style={{color:'#6c63ff',textDecoration:'underline',cursor:'pointer'}}>Browse</span></div>
                          <div style={{fontSize:'12px',color:'#888'}}>Supported formats: JPEG, PNG, GIF</div>
                        </div>
                      </div>
                      {mugshotUrl && (
                        <div style={{marginTop:12, textAlign:'center'}}>
                          <img src={mugshotUrl} alt="Mugshot preview" style={{maxWidth:120, maxHeight:120, borderRadius:8}} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{flex:1}}>
                    <label>Phone Number</label>
                    <input type="text" className="popup-date" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone Number" style={{width:'100%'}} />
                    {errors.phoneNumber && <div className="error-text">{errors.phoneNumber}</div>}
                  </div>
                </div>
                <div style={{display:'flex', gap: 24, marginBottom: 24}}>
                  <div style={{flex:1}}>
                    <label>Fingerprint Hash</label>
                    <input type="text" className="popup-date" value={fingerprintHash} onChange={e => setFingerprintHash(e.target.value)} placeholder="Fingerprint Hash" style={{width:'100%'}} />
                  </div>
                  <div style={{flex:1}}>
                    <label>Health Status</label>
                    <input type="text" className="popup-date" value={healthStatus} onChange={e => setHealthStatus(e.target.value)} placeholder="Health Status" style={{width:'100%'}} />
                  </div>
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