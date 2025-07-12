import React, { useState, useEffect, useCallback } from 'react';
import styles from '../css/PatrolOfficerManagement.module.css';
import { buildPatrolOfficerEndpoint, logEnvironmentInfo } from '../utils/apiConfig';

// Log environment info for debugging
logEnvironmentInfo();

const PatrolOfficerManagement = ({ onSelectOfficer }) => {
  const [officers, setOfficers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [presentStatus, setPresentStatus] = useState('');
  const [zone, setZone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOfficerUserNames, setSelectedOfficerUserNames] = useState({});

  const statusOptions = [
    { value: '', label: 'Present Status (All)' },
    { value: 'OnAboveCase', label: 'On Above Case' },
    { value: 'Idle', label: 'Idle' },
  ];

  const zoneOptions = [
    { value: '', label: 'Zone (All)' },
    { value: 'Sector 5, District 2', label: 'Sector 5, District 2' },
    { value: 'Sector 3, District 1', label: 'Sector 3, District 1' },
    { value: 'Sector 1, District 1', label: 'Sector 1, District 1' },
  ];

  const fetchOfficers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
      });

      if (searchQuery) params.append('searchQuery', searchQuery);
      if (presentStatus) params.append('presentStatus', presentStatus);
      if (zone) params.append('zone', zone);

      const response = await fetch(`${buildPatrolOfficerEndpoint('')}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOfficers(Array.isArray(data.items) ? data.items : []);
      setTotalCount(data.totalCount || 0);
    } catch (err) {
      console.error("Failed to fetch officers:", err);
      setError("Failed to load patrol officers. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, searchQuery, presentStatus, zone]);

  useEffect(() => {
    fetchOfficers();
  }, [fetchOfficers]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPageNumber(1);
  };

  const handleStatusChange = (e) => {
    setPresentStatus(e.target.value);
    setPageNumber(1);
  };

  const handleZoneChange = (e) => {
    setZone(e.target.value);
    setPageNumber(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCount / pageSize)) {
      setPageNumber(newPage);
    }
  };

  const handleCheckboxChange = (userName) => {
    setSelectedOfficerUserNames(prev => ({
      ...prev,
      [userName]: !prev[userName]
    }));
  };

  const handleAddClick = () => {
    const selected = Object.keys(selectedOfficerUserNames).filter(userName => selectedOfficerUserNames[userName]);

    if (selected.length > 0) {
      const selectedOfficers = officers.filter(officer => selected.includes(officer.userName));
      if (onSelectOfficer) {
        onSelectOfficer(selectedOfficers);
      }
    } else {
      alert("Please select at least one officer to add.");
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const displayedRangeStart = (pageNumber - 1) * pageSize + 1;
  const displayedRangeEnd = Math.min(pageNumber * pageSize, totalCount);

  return (
    <div className={styles.container}>
      <div className={styles.header}>ADD PATROL OFFICER TO SCENE</div>

      <div className={styles.controls}>
        <div className={styles.filterGroup}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <select value={presentStatus} onChange={handleStatusChange} className={styles.selectFilter}>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select value={zone} onChange={handleZoneChange} className={styles.selectFilter}>
            {zoneOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <button onClick={handleAddClick} className={styles.addButton}>ADD</button>
      </div>

      {loading && <p className={styles.loadingMessage}>Loading patrol officers...</p>}
      {error && <p className={styles.errorMessage}>Error: {error}</p>}
      {!loading && !error && (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Serial</th>
                  <th className={styles.th}>Select</th>
                  <th className={styles.th}>Full Name</th>
                  <th className={styles.th}>Present Status</th>
                  <th className={styles.th}>Role</th>
                  <th className={styles.th}>Phone Number</th>
                  <th className={styles.th}>Zone</th>
                </tr>
              </thead>
              <tbody>
                {officers.length > 0 ? (
                  officers.map((officer, index) => {
                    const rowClass = officer.presentStatus === 'OnAboveCase'
                      ? styles.rowOnAboveCase
                      : (officer.presentStatus === 'OnCall' ? styles.rowOnCall : '');

                    return (
                      <tr key={officer.userName} className={rowClass}>
                        <td className={styles.td}>{displayedRangeStart + index}</td>
                        <td className={styles.td}>
                          <input
                            type="checkbox"
                            checked={!!selectedOfficerUserNames[officer.userName]}
                            onChange={() => handleCheckboxChange(officer.userName)}
                          />
                        </td>
                        <td className={styles.td}>{officer.fullName}</td>
                        <td className={styles.td}>{officer.presentStatus}</td>
                        <td className={styles.td}>{officer.role}</td>
                        <td className={styles.td}>{officer.phoneNumber}</td>
                        <td className={styles.td}>{officer.zone}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className={styles.td} style={{ textAlign: 'center' }}>No patrol officers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <span className={styles.pageInfo}>
              Showing {displayedRangeStart} to {displayedRangeEnd} / Total {totalCount} records
            </span>
            <button
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={pageNumber <= 1}
              className={styles.pageButton}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pNum => (
              <button
                key={pNum}
                onClick={() => handlePageChange(pNum)}
                className={pNum === pageNumber ? `${styles.pageButton} ${styles.pageButtonActive}` : styles.pageButton}
              >
                {pNum}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(pageNumber + 1)}
              disabled={pageNumber >= totalPages}
              className={styles.pageButton}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PatrolOfficerManagement;