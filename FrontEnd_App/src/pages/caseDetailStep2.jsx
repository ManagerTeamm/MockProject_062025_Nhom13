import React, { useState, useEffect } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import Sidebar from '../components/sidebar';
import ImageAndVideo from '../components/imageAndVideo';

const CaseDetailStep2 = ({
    initialStatements = [],
    mediaFiles = [],
    physicalEvidences = [],
    onAddStatement,
    onEditStatement,
    onDeleteStatement,
    onAddMedia,
    onEditMedia,
    onDeleteMedia,
    onAddEvidence,
    onViewEvidence
}) => {
    const [statementIds, setStatementIds] = useState([]);
    const [statements, setStatements] = useState([]);
    const [mediaIds, setMediaIds] = useState([]);
    const [medias, setMedias] = useState([]);
    const [evidenceIds, setEvidenceIds] = useState([]);
    const [evidences, setEvidences] = useState([]);

    const handleAddStatement = async () => {
        const newId = await onAddStatement();
        if (newId) setStatementIds(prev => [...prev, newId]);
    };

    const handleAddMedia = async () => {
        const newMedia = await ImageAndVideo();
        if (newMedia?.id) setMediaIds(prev => [...prev, newMedia.id]);
    };

    const handleAddEvidence = async () => {
        const newId = await onAddEvidence();
        if (newId) setEvidenceIds(prev => [...prev, newId]);
    };

    return (
        <div className="d-flex">
            <div className="bg-light border-end min-vh-100" style={{ width: "250px" }}>
                <Sidebar />
            </div>

            <div className="flex-grow-1 bg-white" style={{ padding: '2rem' }}>
                <Card className="shadow">
                    <Card.Header
                        style={{ backgroundColor: '#C8E3FF' }}
                        className="text-dark fw-bold text-center fs-5"
                    >
                        INFORMATION PROTECTION FIELD
                    </Card.Header>
                    <Card.Body>

                        <Card className="mb-4 shadow-sm">
                            <Card.Header className="d-flex justify-content-between align-items-center bg-light fw-bold">
                                INITIAL STATEMENTS
                                <Button variant="outline-primary" size="sm" onClick={handleAddStatement}>ADD <i className="bi bi-plus-circle fs-6"></i></Button>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover responsive>
                                    <thead className="table-secondary">
                                        <tr>
                                            <th>#</th>
                                            <th>Statement Type</th>
                                            <th>Provider</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {statements.map((s, idx) => (
                                            <tr key={s.id || idx}>
                                                <td>{idx + 1}</td>
                                                <td>{s.type}</td>
                                                <td>{s.provider}</td>
                                                <td>{s.date}</td>
                                                <td>
                                                    <Button variant="outline-secondary" size="sm" onClick={() => onEditStatement(s)}>✎</Button>{' '}
                                                    <Button variant="outline-danger" size="sm" onClick={() => onDeleteStatement(s.id)}>🗑️</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>

                        <Card className="mb-4 shadow-sm">
                            <Card.Header className="d-flex justify-content-between align-items-center bg-light fw-bold">
                                IMAGES AND VIDEO
                                <Button variant="outline-primary" size="sm" onClick={handleAddMedia}>ADD <i className="bi bi-plus-circle fs-6"></i></Button>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover responsive>
                                    <thead className="table-secondary">
                                        <tr>
                                            <th>#</th>
                                            <th>Video or Image</th>
                                            <th>Description</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {medias.map((m, idx) => (
                                            <tr key={m.id || idx}>
                                                <td>{idx + 1}</td>
                                                <td>{m.fileName}</td>
                                                <td>{m.description}</td>
                                                <td>{m.date}</td>
                                                <td>
                                                    <Button variant="outline-secondary" size="sm" onClick={() => onEditMedia(m)}>✎</Button>{' '}
                                                    <Button variant="outline-danger" size="sm" onClick={() => onDeleteMedia(m.id)}>🗑️</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>

                        <Card className="mb-4 shadow-sm">
                            <Card.Header className="d-flex justify-content-between align-items-center bg-light fw-bold">
                                PRELIMINARY PHYSICAL EVIDENCE INFORMATION
                                <Button variant="outline-primary" size="sm" onClick={handleAddEvidence}>ADD <i className="bi bi-plus-circle fs-6"></i></Button>
                            </Card.Header>
                            <Card.Body>
                                <Table striped bordered hover responsive>
                                    <thead className="table-secondary">
                                        <tr>
                                            <th>ID</th>
                                            <th>Location</th>
                                            <th>Collector</th>
                                            <th>Time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {evidences.map((e, idx) => (
                                            <tr key={e.id || idx}>
                                                <td>{e.id}</td>
                                                <td>{e.location}</td>
                                                <td>{e.collector}</td>
                                                <td>{e.time}</td>
                                                <td>
                                                    <Button variant="outline-info" size="sm" onClick={() => onViewEvidence(e.id)}>View</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary">Cancel</Button>
                            <Button variant="success">Save</Button>
                            <Button variant="primary">Next page</Button>
                        </div>

                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default CaseDetailStep2;
