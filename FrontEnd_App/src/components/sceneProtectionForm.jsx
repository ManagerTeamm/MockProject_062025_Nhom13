import React, { useState } from 'react';
import { Form, Button, Row, Col, Container, Card, Modal } from 'react-bootstrap';
import SceneProtectionDto from '../models/sceneProtection';
import { saveSceneProtection } from '../services/caseService';
import PatrolOfficerManagement from './PatrolOfficerManagement';
import FileUploader from './fileUploader';
import '../styles/sceneProtection.css';
import { getUserFormUserName } from '../services/userService';

const SceneProtectionForm = ({ caseId }) => {
    const [form, setForm] = useState({
        ...SceneProtectionDto,
        caseId: caseId
    });
    const [showOfficerModal, setShowOfficerModal] = useState(false);
    const [selectedOfficer, setSelectedOfficer] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await saveSceneProtection(form);
            alert('Saved successfully!');
        } catch (error) {
            console.error('Save failed', error);
            alert('Failed to save.');
        }
    };

    const handleAddOfficerList = async (officerList) => {
        if (officerList.length > 0) {
            const firstOfficer = officerList[0];
            setForm((prev) => ({
                ...prev,
                officerUserName: firstOfficer.userName,
            }));
            const officer = await getUserFormUserName(firstOfficer.userName);
            setSelectedOfficer(officer.fullName);
            setShowOfficerModal(false);
        }
    };

    return (
        <Container className="my-4">
            <Card className="mx-auto" style={{ maxWidth: '900px' }}>
                <Card.Header style={{ backgroundColor: '#C8E3FF' }} className="text-dark">
                    <strong>INFORMATION PROTECTION FIELD</strong>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">RESPONSIBLE UNIT / OFFICER</Form.Label>
                            <Form.Control
                                name="officerName"
                                value={selectedOfficer}
                                readOnly
                                placeholder="Click to select officer..."
                                onClick={() => setShowOfficerModal(true)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Label className="fw-bold">TIME OF ARRIVAL AT THE SCENE</Form.Label>
                            <Col xs={12} md={6}>
                                <Form.Label>Start time</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="startTime"
                                    value={form.startTime}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Label>End time</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="endTime"
                                    value={form.endTime}
                                    onChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">DESCRIPTION OF SCENE PROTECTION METHODS</Form.Label>
                            <Form.Control as="textarea" rows={3} name="protectionMethods" value={form.protectionMethods} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">AREA COVERED / PERIMETER</Form.Label>
                            <Form.Control as="textarea" rows={3} name="areaCovered" value={form.areaCovered} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">NOTES / SPECIAL INSTRUCTIONS</Form.Label>
                            <Form.Control as="textarea" rows={3} name="specialInstructions" value={form.specialInstructions} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <FileUploader onFileSelected={(fileString) => setForm((prev) => ({ ...prev, attachment: fileString }))} />
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" type="reset" onClick={() => setForm({ ...SceneProtectionDto, caseId })}>Cancel</Button>
                            <Button variant="primary" type="submit">Save</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

            {/* Officer Selection Modal */}
            <Modal
                show={showOfficerModal}
                onHide={() => setShowOfficerModal(false)}
                backdrop="static"
                scrollable
                dialogClassName="custom-width-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Select Patrol Officer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PatrolOfficerManagement
                        onSelectOfficer={(officerName) => handleAddOfficerList(officerName)}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default SceneProtectionForm;
