import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import '../styles/investigation.css';
import '../styles/evidence.css';

const caseData = [
  { caseId: '#E0462', type: 'Robbery case', severity: 'Urgent', status: 'Processing in phase 3', reportTime: '2h00 am - 12/12/2024' },
  { caseId: '#E0461', type: 'Robbery case', severity: 'Not urgent', status: 'Processing in phase 3', reportTime: '2h00 am - 10/12/2024' },
];

const statusClass = status => {
  if (status === 'Processing in phase 3') return 'status-processing';
  return '';
};

const CaseList = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = 3;

  // Lọc dữ liệu theo filter
  const filteredData = caseData.filter(row => {
    const statusMatch = statusFilter ? row.status === statusFilter : true;
    const dateMatch = dateFilter ? row.reportTime.includes(dateFilter) : true;
    return statusMatch && dateMatch;
  });

  return (
    <div className="investigation-container">
      <Sidebar />
      <main className="investigation-main">
        <header className="investigation-header">
          <h1>List of cases</h1>
        </header>
        <section className="section">
          <div className="section-box">
            <div className="filter-row" style={{marginBottom: 24}}>
              <div>
                <label>Status</label>
                <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                  <option value="">Select an option</option>
                  <option value="Processing in phase 3">Processing in phase 3</option>
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
                  <th>Type of case</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Report time</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, idx) => (
                  <tr key={row.caseId}>
                    <td>{row.caseId}</td>
                    <td>{row.type}</td>
                    <td>{row.severity}</td>
                    <td><span className={statusClass(row.status)}>{row.status}</span></td>
                    <td>{row.reportTime}</td>
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
            <div className="section-title-row" style={{marginTop: 32}}>
              <span>EVIDENCE</span>
              <button className="btn-list" onClick={() => window.location.href='/evidence'}>
                <img src="/icons/calendar_today.svg" alt="calendar" className="icon-calendar" /> LIST
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CaseList; 