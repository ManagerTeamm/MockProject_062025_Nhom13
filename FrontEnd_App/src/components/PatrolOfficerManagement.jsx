import React, { useState, useEffect, useCallback } from 'react';
import '../css/PatrolOfficerManagement.css';

const API_BASE_URL = 'http://localhost:5151/api/PatrolOfficerUser';

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

      const response = await fetch(`${API_BASE_URL}?${params.toString()}`);

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
            console.log("Selected Officers:", selectedOfficers);

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
    <div className="container">
      <div className="header">ADD PATROL OFFICER TO SCENE</div>

      <div className="controls">
        <div className="filterGroup">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="searchInput"
          />
          <select value={presentStatus} onChange={handleStatusChange} className="selectFilter">
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <select value={zone} onChange={handleZoneChange} className="selectFilter">
            {zoneOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <button onClick={handleAddClick} className="addButton">ADD</button>
      </div>

      {loading && <p className="loadingMessage">Loading patrol officers...</p>}
      {error && <p className="errorMessage">Error: {error}</p>}
      {!loading && !error && (
        <>
          <div className="tableWrapper">
            <table className="table">
              <thead>
                <tr><th className="th">Serial</th><th className="th">Select</th><th className="th">Full Name</th><th className="th">Present Status</th><th className="th">Role</th><th className="th">Phone Number</th><th className="th">Zone</th></tr>
              </thead>
              <tbody>
                {officers.length > 0 ? (
                  officers.map((officer, index) => (
                    <tr
                      key={officer.userName}
                      className={officer.presentStatus === 'On Above Case' ? 'rowOnAboveCase' :
                               (officer.presentStatus === 'On Call' ? 'rowOnCall' : '')}
                    >
                      <td className="td">{(pageNumber - 1) * pageSize + index + 1}</td>
                      <td className="td">
                        <input
                          type="checkbox"
                          checked={!!selectedOfficerUserNames[officer.userName]}
                          onChange={() => handleCheckboxChange(officer.userName)}
                        />
                      </td>
                      <td className="td">{officer.fullName}</td>
                      <td className="td">{officer.presentStatus}</td>
                      <td className="td">{officer.role}</td>
                      <td className="td">{officer.phoneNumber}</td>
                      <td className="td">{officer.zone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="td" style={{ textAlign: 'center' }}>No patrol officers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <span className="pageInfo">
              Showing {displayedRangeStart} to {displayedRangeEnd} / Total {totalCount} records
            </span>
            <button
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={pageNumber <= 1}
              className="pageButton"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pNum => (
              <button
                key={pNum}
                onClick={() => handlePageChange(pNum)}
                className={pNum === pageNumber ? 'pageButton pageButtonActive' : 'pageButton'}
              >
                {pNum}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(pageNumber + 1)}
              disabled={pageNumber >= totalPages}
              className="pageButton"
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