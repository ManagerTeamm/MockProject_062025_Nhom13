import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';

const StatementTable = ({ statements, onAdd, onEdit, onDelete }) => {
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center bg-light fw-bold">
                INITIAL STATEMENTS
                <Button variant="outline-primary" size="sm" onClick={onAdd}>ADD <i className="bi bi-plus-circle fs-6"></i></Button>
            </Card.Header>
            <Card.Body>
                <Table striped bordered hover responsive>
                    <thead className="table-secondary">
                        <tr>
                            <th>#</th>
                            <th>Type</th>
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
                                    <Button variant="outline-secondary" size="sm" onClick={() => onEdit(s)}>✎</Button>{' '}
                                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(s.id)}>🗑️</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default StatementTable;