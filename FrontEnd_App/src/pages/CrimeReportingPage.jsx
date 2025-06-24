// Frontend_App/src/pages/CrimeReportingPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import CrimeTable from '../components/CrimeTable'; // ĐÃ SỬA ĐƯỜNG DẪN
import Pagination from '../components/Pagination'; // ĐÃ SỬA ĐƯỜNG DẪN
import '../styles.css';

function CrimeReportingPage({ onEditCrime, onDeleteCrime, allCrimes }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1); // Khi allCrimes thay đổi, reset về trang 1
    }, [allCrimes]);

    const handleDeleteCrime = (crimeId) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa vụ án #${crimeId} không?`)) {
            onDeleteCrime(crimeId); // Gửi yêu cầu xóa lên component cha
            alert(`Vụ án #${crimeId} đã được xóa thành công!`);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleEntriesChange = (e) => {
        setEntriesPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const filteredCrimes = allCrimes.filter(crime =>
        Object.values(crime).some(val => {
            if (typeof val === 'object' && val !== null) {
                return Object.values(val).some(nestedVal =>
                    String(nestedVal).toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            return String(val).toLowerCase().includes(searchTerm.toLowerCase());
        })
    );

    const totalPages = Math.ceil(filteredCrimes.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedCrimes = filteredCrimes.slice(startIndex, startIndex + entriesPerPage);

    return (
        <div id="crime-reporting-section" className="content-section active">
            <h2>Crime Detection and Reporting</h2>
            <div className="table-controls">
                <label htmlFor="showEntries">Show</label>
                <select id="showEntries" value={entriesPerPage} onChange={handleEntriesChange}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
                <span>entries</span>
                <input
                    type="search"
                    id="searchCrimes"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <CrimeTable
                crimes={paginatedCrimes}
                onEdit={onEditCrime}
                onDelete={handleDeleteCrime}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default CrimeReportingPage;