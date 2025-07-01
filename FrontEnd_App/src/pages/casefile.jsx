import React from "react";
import sampleCases from '../samples/case';
import { useState } from 'react';

const CaseFile = () => {
    const [search, setSearch] = useState('');
    const [selectedCase, setSelectedCase] = useState(null);
    const [modalType, setModalType] = useState('');
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    const openModal = (caseFile, type, event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPopupPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
        setSelectedCase(caseFile);
        setModalType(type);
    };

    const closeModal = () => {
        setSelectedCase(null);
        setModalType('');
    };

    const filteredCases = sampleCases.filter((c) =>
        c.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Case Files</h2>
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search case ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Case ID</th>
                        <th>Time</th>
                        <th>Address</th>
                        <th>Reason</th>
                        <th>Suspect</th>
                        <th>Cadre</th>
                        <th>Incident</th>
                        <th>Arrest</th>
                        <th>Miranda</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCases.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.time}</td>
                            <td>{c.address}</td>
                            <td>{c.reason}</td>
                            <td>
                                <button className="btn btn-link p-0" onClick={(e) => openModal(c, 'suspect', e)}>
                                    {c.suspect.fullName}
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-primary" onClick={(e) => openModal(c, 'cadre', e)}>
                                    Details
                                </button>
                            </td>
                            <td>{c.incident}</td>
                            <td>
                                <button className="btn btn-sm btn-secondary" onClick={(e) => openModal(c, 'arrest', e)}>
                                    View
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-warning" onClick={(e) => openModal(c, 'miranda', e)}>
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalType && selectedCase && (
                <div
                    className="position-absolute bg-white border shadow rounded p-3"
                    style={{
                        top: popupPosition.top + 8,
                        left: popupPosition.left,
                        zIndex: 1000,
                        width: '300px'
                    }}
                >
                    <div className="d-flex justify-content-between mb-2">
                        <strong>
                            {modalType === 'suspect' && 'Suspect'}
                            {modalType === 'cadre' && 'Cadre'}
                            {modalType === 'arrest' && 'Arrest'}
                            {modalType === 'miranda' && 'Miranda'}
                        </strong>
                        <button className="btn btn-sm btn-outline-danger py-0 px-2" onClick={closeModal}>×</button>
                    </div>

                    {modalType === 'suspect' && (
                        <>
                            <p><strong>Case ID:</strong> {selectedCase.id}</p>
                            <p><strong>Name:</strong> {selectedCase.suspect.fullName}</p>
                            <p><strong>Birthdate:</strong> {selectedCase.suspect.birthdate}</p>
                            <p><strong>Features:</strong> {selectedCase.suspect.features}</p>
                            <img src={selectedCase.suspect.photoUrl} className="img-fluid rounded" alt="Suspect" />
                        </>
                    )}

                    {modalType === 'cadre' && (
                        <>
                            <p><strong>Case ID:</strong> {selectedCase.id}</p>
                            <p><strong>Suspect:</strong> {selectedCase.suspect.fullName}</p>
                            <table className="table table-bordered mt-3">
                                <thead>
                                    <tr>
                                        <th>Cadre ID</th>
                                        <th>Cadre Name</th>
                                        <th>Photo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedCase.cadreList.map((cadre) => (
                                        <tr key={cadre.id}>
                                            <td>{cadre.id}</td>
                                            <td>{cadre.name}</td>
                                            <td>
                                                <img src={cadre.photoUrl} alt={cadre.name} className="img-thumbnail" style={{ width: '80px' }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    {modalType === 'arrest' && (
                        <p>{selectedCase.arrestRecord}</p>
                    )}

                    {modalType === 'miranda' && (
                        <>
                            <p><strong>Case ID:</strong> {selectedCase.id}</p>
                            <p><strong>Suspect:</strong> {selectedCase.suspect.fullName}</p>
                            <p><strong>Suspect ID:</strong> {selectedCase.suspect.id}</p>
                            <p><strong>Notification Time:</strong> {selectedCase.miranda.notificationTime}</p>
                            <p><strong>Executor:</strong> {selectedCase.miranda.executor}</p>
                            <p><strong>Signature:</strong> {selectedCase.miranda.signature}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
export default CaseFile;