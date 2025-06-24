// Frontend_App/src/components/CrimeTable.jsx
import React from 'react';

function CrimeTable({ crimes, onEdit, onDelete }) {
    if (!crimes || crimes.length === 0) {
        return <p>Không tìm thấy vụ án nào.</p>;
    }

    return (
        <table className="crimes-table">
            <thead>
                <tr>
                    <th>Case ID</th>
                    <th>Type of Crime</th>
                    <th>Level of Severity</th>
                    <th>Date</th>
                    <th>Receiving Unit</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="crimesTableBody">
                {crimes.map(crime => (
                    <tr key={crime.id}>
                        <td>#{crime.id}</td>
                        <td>{crime.typeOfCrime || 'N/A'}</td>
                        <td>{crime.levelOfSeverity || 'N/A'}</td>
                        <td>{crime.date || 'N/A'}</td>
                        <td>{crime.receivingUnit || 'N/A'}</td>
                        <td>{crime.location || 'N/A'}</td>
                        <td>
                            <span className={`status-${(crime.status || 'Unspecified').toLowerCase().replace(/\s/g, '-')}`}>
                                {crime.status || 'N/A'}
                            </span>
                        </td>
                        <td>
                            <button className="edit-btn" onClick={() => onEdit(crime.id)}>Edit</button>
                            <button className="delete-btn" onClick={() => onDelete(crime.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CrimeTable;