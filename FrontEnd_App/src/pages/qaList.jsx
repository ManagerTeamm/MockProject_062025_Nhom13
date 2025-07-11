import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import '../styles/investigation.css';
import '../styles/evidence.css';
import { useNavigate } from 'react-router-dom';

const initialQAList = [
  { caseId: '#C001', interviewId: '#I001', question: 'What happened?', answer: 'I saw the suspect running.', trust: 'Reliable' },
  { caseId: '#C002', interviewId: '#I002', question: 'Where were you?', answer: 'At home.', trust: 'Unreliable' },
  { caseId: '#C003', interviewId: '#I003', question: 'Who was with you?', answer: 'My friend.', trust: 'Reliable' },
];

const trustOptions = [
  { value: '', label: 'All' },
  { value: 'Reliable', label: 'Reliable' },
  { value: 'Unreliable', label: 'Unreliable' },
];

const QAList = () => {
  const navigate = useNavigate();
  const [trustFilter, setTrustFilter] = useState('');
  const [qaList, setQaList] = useState(initialQAList);
  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = 1;

  const filteredList = trustFilter
    ? qaList.filter(row => row.trust === trustFilter)
    : qaList;

  // Pagination logic (giả lập)
  const paginatedList = filteredList.slice((page-1)*pageSize, page*pageSize);

  return (
    <div className="investigation-container">
      <Sidebar />
      <main className="investigation-main">
        <header className="investigation-header">
          <h1>List of Q&amp;A</h1>
        </header>
        <section className="section">
          <div className="section-box">
            <div className="section-title-row">
              <button className="btn-back" onClick={() => navigate(-1)}>BACK <img src="/icons/Back.png" alt="back" className="icon-back" /></button>
              <div style={{ flex: 1 }} />
              <button className="btn-add"><img src="/icons/add_circle.svg" alt="add" className="icon-add" /> ADD</button>
            </div>
            <div className="filter-row">
              <div>
                <label>Level of trust</label>
                <select className="filter-select" value={trustFilter} onChange={e => setTrustFilter(e.target.value)}>
                  {trustOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <table className="info-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Interview ID</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Level of trust</th>
                </tr>
              </thead>
              <tbody>
                {paginatedList.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.caseId}</td>
                    <td>{row.interviewId}</td>
                    <td>{row.question}</td>
                    <td>{row.answer}</td>
                    <td>{row.trust}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-row">
              <span>Show <select><option>10</option></select> entries</span>
              <div className="pagination">
                <button className="page-btn" disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Previous</button>
                <button className="page-btn active">{page}</button>
                <button className="page-btn" disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default QAList; 