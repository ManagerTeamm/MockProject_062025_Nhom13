import React, { useState, useEffect, useCallback } from 'react';

// Basic inline styles to mimic the layout.
// In a real project, you'd use a CSS file or CSS-in-JS.
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1200px',
    margin: '20px auto',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '10px',
    flexWrap: 'wrap',
  },
  filterGroup: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  searchInput: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    width: '250px',
  },
  selectFilter: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    minWidth: '150px',
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  tableWrapper: {
    overflowX: 'auto',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '800px', // Ensure table doesn't get too small
  },
  th: {
    backgroundColor: '#f2f2f2',
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    fontSize: '14px',
    color: '#555',
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    fontSize: '14px',
  },
  rowOnAboveCase: {
    backgroundColor: '#ffdddd', // Light red for "On Above Case"
  },
  rowOnCall: {
    backgroundColor: '#d4edda', // Light green for "On Call"
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '20px',
    gap: '5px',
  },
  pageButton: {
    backgroundColor: '#e9e9e9',
    border: '1px solid #ccc',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  pageButtonActive: {
    backgroundColor: '#007bff',
    color: 'white',
    border: '1px solid #007bff',
  },
  pageInfo: {
    marginRight: '15px',
    fontSize: '14px',
    color: '#555',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
  },
  loadingMessage: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#007bff',
  }
};

const API_BASE_URL = 'http://localhost:5151/api/PatrolOfficerUser'; // **Adjust this to your actual API URL**

const PatrolOfficerManagement = () => {
  const [officers, setOfficers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10); // As shown in the UI "Hiển thị 01 đến 21/ Tổng số 24 bản ghi" implies pageSize might be dynamic or large
  const [searchQuery, setSearchQuery] = useState('');
  const [presentStatus, setPresentStatus] = useState('');
  const [zone, setZone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOfficerUserNames, setSelectedOfficerUserNames] = useState({}); // To store selected checkboxes

  // Define options for dropdowns (hardcoded for demonstration)
  const statusOptions = [
    { value: '', label: 'Present Status (All)' },
    { value: 'OnAboveCase', label: 'On Above Case' },
    { value: 'Idle', label: 'Idle' },
    // { value: 'OnCall', label: 'On Call' }, // Include if your API supports this explicitly
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

      const response = await fetch(`${API_BASE_URL}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOfficers(data.items);
      setTotalCount(data.totalCount);
      // setPageNumber(data.pageNumber); // API typically returns the requested page number
      // setPageSize(data.pageSize);   // API typically returns the requested page size
    } catch (err) {
      console.error("Failed to fetch officers:", err);
      setError("Failed to load patrol officers. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, searchQuery, presentStatus, zone]);

  // Effect to fetch officers whenever filters or pagination change
  useEffect(() => {
    fetchOfficers();
  }, [fetchOfficers]);

  // Handlers for filter and pagination changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPageNumber(1); // Reset to first page on new search
  };

  const handleStatusChange = (e) => {
    setPresentStatus(e.target.value);
    setPageNumber(1); // Reset to first page on filter change
  };

  const handleZoneChange = (e) => {
    setZone(e.target.value);
    setPageNumber(1); // Reset to first page on filter change
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
      alert(`Selected officers for addition (feature not implemented in API): ${selected.join(', ')}`);
      // Here you would typically call an API to add these officers to a case/scene
      // E.g., await fetch('/api/cases/someCaseId/assign-officers', { method: 'POST', body: JSON.stringify({ officerUserNames: selected }) });
    } else {
      alert("Please select at least one officer to add.");
    }
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalCount / pageSize);
  const displayedRangeStart = (pageNumber - 1) * pageSize + 1;
  const displayedRangeEnd = Math.min(pageNumber * pageSize, totalCount);

  return (
    <div style={styles.container}>
      <div style={styles.header}>ADD PATROL OFFICAL TO SENCE</div>

      <div style={styles.controls}>
        <div style={styles.filterGroup}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
          <select value={presentStatus} onChange={handleStatusChange} style={styles.selectFilter}>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select value={zone} onChange={handleZoneChange} style={styles.selectFilter}>
            {zoneOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <button onClick={handleAddClick} style={styles.addButton}>ADD</button>
      </div>

      {loading && <p style={styles.loadingMessage}>Loading patrol officers...</p>}
      {error && <p style={styles.errorMessage}>Error: {error}</p>}
      {!loading && !error && (
        <>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Serial</th>
                  <th style={styles.th}>Select</th>
                  <th style={styles.th}>Full Name</th>
                  <th style={styles.th}>Present Status</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Phone Number</th>
                  <th style={styles.th}>Zone</th>
                </tr>
              </thead>
              <tbody>
                {officers.length > 0 ? (
                  officers.map((officer, index) => (
                    <tr
                      key={officer.userName}
                      style={officer.presentStatus === 'On Above Case' ? styles.rowOnAboveCase :
                             (officer.presentStatus === 'On Call' ? styles.rowOnCall : {})}
                    >
                      <td style={styles.td}>{(pageNumber - 1) * pageSize + index + 1}</td>
                      <td style={styles.td}>
                        <input
                          type="checkbox"
                          checked={!!selectedOfficerUserNames[officer.userName]}
                          onChange={() => handleCheckboxChange(officer.userName)}
                        />
                      </td>
                      <td style={styles.td}>{officer.fullName}</td>
                      <td style={styles.td}>{officer.presentStatus}</td>
                      <td style={styles.td}>{officer.role}</td>
                      <td style={styles.td}>{officer.phoneNumber}</td>
                      <td style={styles.td}>{officer.zone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ ...styles.td, textAlign: 'center' }}>No patrol officers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div style={styles.pagination}>
            <span style={styles.pageInfo}>
              Hiển thị {displayedRangeStart} đến {displayedRangeEnd}/ Tổng số {totalCount} bản ghi
            </span>
            <button
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={pageNumber <= 1}
              style={styles.pageButton}
            >
              &lt;
            </button>
            {/* Render page number buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pNum => (
              <button
                key={pNum}
                onClick={() => handlePageChange(pNum)}
                style={pNum === pageNumber ? { ...styles.pageButton, ...styles.pageButtonActive } : styles.pageButton}
              >
                {pNum}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(pageNumber + 1)}
              disabled={pageNumber >= totalPages}
              style={styles.pageButton}
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