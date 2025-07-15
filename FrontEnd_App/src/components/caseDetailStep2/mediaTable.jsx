import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';

const MediaTable = ({ medias, onAdd, onEdit, onDelete }) => {
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center bg-light fw-bold">
                IMAGES AND VIDEO
                <Button variant="outline-primary" size="sm" onClick={onAdd}>ADD <i className="bi bi-plus-circle fs-6"></i></Button>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover responsive>
                    <thead className="table-secondary">
                        <tr>
                            <th>#</th>
                            <th>File</th>
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
                                    <Button variant="outline-secondary" size="sm" onClick={() => onEdit(m)}>✎</Button>{' '}
                                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(m.id)}>🗑️</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default MediaTable;