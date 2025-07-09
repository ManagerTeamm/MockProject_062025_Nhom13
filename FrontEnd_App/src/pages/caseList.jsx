import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import '../styles/investigation.css';
import '../styles/evidence.css';

const API_URL = 'https://localhost:7064/api/cases'; 

const statusClass = (status) => {
  switch (status) {
    case 'New Case':
      return 'badge status-new';
    case 'Processing in phase 2':
      return 'badge status-processing-phase2';
    case 'Pending approve for phase 3':
      return 'badge status-pending-phase3';
    case 'Processing in phase 3':
      return 'badge status-processing-phase3';
    case 'Done':
      return 'badge status-done';
    default:
      return 'badge';
  }
};


const CaseList = () => {
  const [cases, setCases] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); 

  useEffect(() => {
    fetchCases();
  }, [search, statusFilter, entries, page, sortBy, sortOrder]);

  const fetchCases = async () => {
    const params = new URLSearchParams({
      PageNumber: page,
      PageSize: entries,
      SortBy: sortBy,
      SortOrder: sortOrder,
    });

    if (search) {
      params.append('SearchQuery', search);
    }

    if (statusFilter) {
      params.append('SearchQuery', statusFilter); // Assuming statusFilter can also be part of SearchQuery
    }

    try {
      const response = await fetch(`${API_URL}?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCases(data.items);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error('Error fetching case data:', error);
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc'); // Default to ascending when sorting a new column
    }
    setPage(1); // Reset to first page when sorting
  };

  const renderSortArrow = (field) => {
    if (sortBy === field) {
      return sortOrder === 'asc' ? <span className="sort-arrow asc">&#9650;</span> : <span className="sort-arrow desc">&#9660;</span>;
    }
    return <span className="sort-arrow default">&#9650;&#9660;</span>; // Both arrows when not sorted
  };

  return (
    <div className="investigation-container">
      <Sidebar />
      <main className="investigation-main">
        <header className="investigation-header">
          <h1>List of cases</h1>
        </header>

        <section className="section">
          <div className="section-box">

            <div className="filter-row" style={{ marginBottom: 24 }}>
              <label>Show
                <select value={entries} onChange={(e) => setEntries(parseInt(e.target.value))}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
                entries
              </label>

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="filter-input"
              />

              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
                <option value="">All Statuses</option>
                <option value="New Case">New Case</option>
                <option value="Processing in phase 2">Processing in phase 2</option>
                <option value="Pending approve for phase 3">Pending approve for phase 3</option>
                <option value="Processing in phase 3">Processing in phase 3</option>
                <option value="Done">Done</option>

              </select>
            </div>

            <table className="info-table">
              <thead>
                <tr>
                  {/* Case ID - No sort */}
                  <th>Case ID</th>
                  {/* Type of Crime - With sort */}
                  <th onClick={() => toggleSort('TypeOfCrime')}>Type of Crime {renderSortArrow('TypeOfCrime')}</th>
                  {/* Level of severity - With sort */}
                  <th onClick={() => toggleSort('LevelOfSeverity')}>Level of severity {renderSortArrow('LevelOfSeverity')}</th>
                  {/* Date - With sort */}
                  <th onClick={() => toggleSort('Date')}>Date {renderSortArrow('Date')}</th>
                  {/* Reporter - No sort */}
                  <th>Reporter</th>
                  {/* Location - No sort */}
                  <th>Location</th>
                  {/* Status - With sort */}
                  <th onClick={() => toggleSort('Status')}>Status {renderSortArrow('Status')}</th>
                </tr>
              </thead>
              <tbody>
                {cases.length > 0 ? (
                  cases.map((c) => (
                    <tr key={c.caseId}>
                      <td>{c.caseId}</td>
                      <td>{c.typeOfCrime}</td>
                      <td>{c.levelOfSeverity}</td>
                      <td>{new Date(c.date).toLocaleDateString()}</td>
                      <td>{c.reporter}</td>
                      <td>{c.location}</td>
                      <td><span className={statusClass(c.status)}>{c.status}</span></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>No cases found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="pagination-row">
              <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="page-btn">Previous</button>
              <span className="page-btn active">{page}</span>
              <button disabled={(page * entries) >= totalCount} onClick={() => setPage(p => p + 1)} className="page-btn">Next</button>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default CaseList;