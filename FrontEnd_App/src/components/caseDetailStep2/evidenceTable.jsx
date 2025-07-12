import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';

const EvidenceTable = ({ evidences, onAdd, onView }) => {
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center bg-light fw-bold">
                PRELIMINARY PHYSICAL EVIDENCE INFORMATION
                <Button variant="outline-primary" size="sm" onClick={onAdd}>ADD <i className="bi bi-plus-circle fs-6"></i></Button>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover responsive>
                    <thead className="table-secondary">
                        <tr>
                            <th>#</th>
                            <th>Location</th>
                            <th>Collector</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evidences.map((e, idx) => (
                            <tr key={e.id || idx}>
                                <td>{idx + 1}</td>
                                <td>{e.location}</td>
                                <td>{e.collector}</td>
                                <td>{e.time}</td>
                                <td>
                                    <Button variant="outline-info" size="sm" onClick={() => onView(e.id)}>View</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default EvidenceTable;
