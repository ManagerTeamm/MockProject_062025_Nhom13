import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col, Container, Card, Modal } from 'react-bootstrap';
import PatrolOfficerManagement from './PatrolOfficerManagement';

const InitialResponse = () => {
    const [showModal, setShowModal] = useState(false);
    const [showPreservationModal, setShowPreservationModal] = useState(false);
    const [assignedOfficers, setAssignedOfficers] = useState([]);
    const [preservationMeasures, setPreservationMeasures] = useState([
        { id: 1, measure: "Immediate perimeter established using police tape (approx. 30-meter radius)" },
        { id: 2, measure: "Vehicle stabilized to prevent further movement." },
        { id: 3, measure: "Photographic documentation of the scene commenced at 22:26." }
    ]);
    const [newPreservationMeasure, setNewPreservationMeasure] = useState('');
    const [editingMeasure, setEditingMeasure] = useState(null);

    const handleViewClick = () => {
        setShowModal(true);
    };

    const handleSelectOfficers = (selected) => {
        // Append unique officers
        setAssignedOfficers(prev => {
            const existingUserNames = new Set(prev.map(o => o.userName));
            const newOnes = selected.filter(o => !existingUserNames.has(o.userName));
            return [...prev, ...newOnes];
        });
        setShowModal(false);
    };

    const handleAddPreservationMeasure = () => {
        if (newPreservationMeasure.trim()) {
            const newId = Math.max(...preservationMeasures.map(m => m.id), 0) + 1;
            setPreservationMeasures(prev => [...prev, { id: newId, measure: newPreservationMeasure.trim() }]);
            setNewPreservationMeasure('');
            setShowPreservationModal(false);
        }
    };

    const handleEditPreservationMeasure = (measure) => {
        setEditingMeasure(measure);
        setNewPreservationMeasure(measure.measure);
        setShowPreservationModal(true);
    };

    const handleUpdatePreservationMeasure = () => {
        if (newPreservationMeasure.trim() && editingMeasure) {
            setPreservationMeasures(prev => 
                prev.map(m => m.id === editingMeasure.id ? { ...m, measure: newPreservationMeasure.trim() } : m)
            );
            setNewPreservationMeasure('');
            setEditingMeasure(null);
            setShowPreservationModal(false);
        }
    };

    const handleDeletePreservationMeasure = (id) => {
        if (window.confirm('Are you sure you want to delete this preservation measure?')) {
            setPreservationMeasures(prev => prev.filter(m => m.id !== id));
        }
    };

    const handlePreservationModalClose = () => {
        setShowPreservationModal(false);
        setNewPreservationMeasure('');
        setEditingMeasure(null);
    };

    return (
        <div className="container my-5 font-montserrat">
            <h3 className="text-center fw-bold mb-4 fs-4">INITIAL RESPONSE</h3>

            {/* Dispatch Time */}
            <Row className="mb-3">
                <Form.Label className="fw-bold">TIME OF DISPATCHING FORCES TO THE SCENE</Form.Label>
                <Col xs={12} md={12}>
                    <Form.Control
                        type="time"
                        name=""
                        required
                    />
                </Col>
            </Row>

            {/* Arrival Time */}
            <Row className="mb-3">
                <Form.Label className="fw-bold">TIME OF ARRIVAL AT THE SCENE</Form.Label>
                <Col xs={12} md={12}>
                    <Form.Control
                        type="time"
                        name=""
                        required
                    />
                </Col>
            </Row>

            {/* Officers Assigned */}
            <div className="mb-4">
                <label className="form-label fw-semibold text-uppercase small">LIST OF OFFICERS ASSIGNED TO THE SCENE</label>
                <div className="d-flex justify-content-end">
                    <Button variant="outline-primary" size="sm" className="mb-2 rounded-3" onClick={handleViewClick}>
                        View
                    </Button>
                </div>
                <table className="table table-bordered rounded-3 overflow-hidden">
                    <thead className="table-light text-uppercase small">
                        <tr>
                            <th>Full Name</th>
                            <th>Role</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedOfficers.length > 0 ? (
                            assignedOfficers.map(officer => (
                                <tr key={officer.userName}>
                                    <td>{officer.fullName}</td>
                                    <td>{officer.role}</td>
                                    <td>{officer.phoneNumber}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No officers assigned.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Scene Assessment */}
            <div className="mb-4">
                <label className="form-label fw-semibold text-uppercase small">PRELIMINARY ASSESSMENT OF THE SCENE SITUATION</label>
                <textarea className="form-control rounded-3" rows="3" defaultValue="A s"></textarea>
            </div>

            {/* Preservation Measures */}
            <div className="mb-4">
                <label className="form-label fw-semibold text-uppercase small">SCENE PRESERVATION MEASURES TAKEN</label>
                <div className="d-flex justify-content-end">
                    <button 
                        className="btn btn-outline-secondary btn-sm mb-2 rounded-3"
                        onClick={() => setShowPreservationModal(true)}
                    >
                        ADD <i className="bi bi-plus-circle ms-1"></i>
                    </button>
                </div>
                <table className="table table-bordered rounded-3 overflow-hidden">
                    <thead className="table-light text-uppercase small">
                        <tr>
                            <th>#</th>
                            <th>Preservation Measures</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {preservationMeasures.map((measure, index) => (
                            <tr key={measure.id}>
                                <td>{index + 1}</td>
                                <td>{measure.measure}</td>
                                <td>
                                    <button 
                                        className="btn btn-sm btn-outline-danger me-1 rounded-3"
                                        onClick={() => handleDeletePreservationMeasure(measure.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-outline-secondary rounded-3"
                                        onClick={() => handleEditPreservationMeasure(measure)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Medical Rescue */}
            <div className="mb-4">
                <label className="form-label fw-semibold text-uppercase small">INFORMATION ON MEDICAL/RESCUE SUPPORT PROVIDED</label>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-secondary btn-sm mb-2 rounded-3">ADD <i className="bi bi-plus-circle ms-1"></i></button>
                </div>
                <table className="table table-bordered rounded-3 overflow-hidden">
                    <thead className="table-light text-uppercase small">
                        <tr>
                            <th>Medical/Rescue Unit ID</th>
                            <th>Type of Support Provided</th>
                            <th>Time of Arrival</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>EMS45</td>
                            <td>Medical Emergency</td>
                            <td>08:00 PM</td>
                            <td>
                                <button className="btn btn-sm btn-outline-danger me-1 rounded-3"><i className="bi bi-trash"></i></button>
                                <button className="btn btn-sm btn-outline-secondary rounded-3"><i className="bi bi-pencil"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>RES-Q12</td>
                            <td>Patrol Officer</td>
                            <td>08:00 PM</td>
                            <td>
                                <button className="btn btn-sm btn-outline-danger me-1 rounded-3"><i className="bi bi-trash"></i></button>
                                <button className="btn btn-sm btn-outline-secondary rounded-3"><i className="bi bi-pencil"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>RES-Q12</td>
                            <td>Detective</td>
                            <td>08:00 PM</td>
                            <td>
                                <button className="btn btn-sm btn-outline-danger me-1 rounded-3"><i className="bi bi-trash"></i></button>
                                <button className="btn btn-sm btn-outline-secondary rounded-3"><i className="bi bi-pencil"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Footer Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <button className="btn btn-light px-4">Cancel</button>
                <div className="d-flex gap-2">
                    <button className="btn btn-secondary px-4">Save</button>
                    <button className="btn btn-dark px-4">Next page</button>
                </div>
            </div>

            {/* Officer Selection Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Select Patrol Officers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PatrolOfficerManagement onSelectOfficer={handleSelectOfficers} />
                </Modal.Body>
            </Modal>

            {/* Preservation Measure Modal */}
            <Modal show={showPreservationModal} onHide={handlePreservationModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingMeasure ? 'Edit Preservation Measure' : 'Add Preservation Measure'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Preservation Measure</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newPreservationMeasure}
                                onChange={(e) => setNewPreservationMeasure(e.target.value)}
                                placeholder="Enter preservation measure description..."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handlePreservationModalClose}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={editingMeasure ? handleUpdatePreservationMeasure : handleAddPreservationMeasure}
                        disabled={!newPreservationMeasure.trim()}
                    >
                        {editingMeasure ? 'Update' : 'Add'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InitialResponse;