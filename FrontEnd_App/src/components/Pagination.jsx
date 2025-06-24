// Frontend_App/src/components/Pagination.jsx
import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="pagination">
            {pages.map(page => (
                <button
                    key={page}
                    className={page === currentPage ? 'active' : ''}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default Pagination;