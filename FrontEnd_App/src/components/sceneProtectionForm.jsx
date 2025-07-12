import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Card, Modal } from 'react-bootstrap';
import SceneProtectionDto from '../models/sceneProtection';
import { saveSceneProtection } from '../services/caseService';
import PatrolOfficerManagement from './PatrolOfficerManagement';
import FileUploader from './fileUploader';
import '../styles/sceneProtection.css';
import { getUserFormUserName } from '../services/userService';

const SceneProtectionForm = ({ caseId, onSave, onCancel, editData }) => {
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
            const formWithAttachments = {
                ...form,
                attachment: attachments
            };

            // Call onSave callback if provided
            if (onSave) {
                onSave(formWithAttachments);
            }
        } catch (error) {
            console.error('Save failed', error);
            alert('Failed to save.');
        }
    };

    const [attachments, setAttachments] = useState([]);

    // 2. Sửa useEffect để load attachments khi edit
    useEffect(() => {
        if (editData) {
            setForm(prev => ({
                ...prev,
                protectionMethods: editData.measure || '',
                officerUserName: editData.officer || '',
                startTime: editData.startTime || '',
                endTime: editData.endTime || '',
                areaCovered: editData.areaCovered || '',
                specialInstructions: editData.specialInstructions || '',
                attachment: editData.attachment || null
            }));

            // Load existing attachments
            if (editData.attachment) {
                if (Array.isArray(editData.attachment)) {
                    setAttachments(editData.attachment);
                } else if (typeof editData.attachment === 'string') {
                    setAttachments([editData.attachment]);
                }
            }

            // Load officer name nếu có
            if (editData.officer) {
                const loadOfficerName = async () => {
                    try {
                        const officer = await getUserFormUserName(editData.officer);
                        setSelectedOfficer(officer.fullName);
                    } catch (error) {
                        console.error('Error loading officer:', error);
                        setSelectedOfficer(editData.officer);
                    }
                };
                loadOfficerName();
            }
        }
    }, [editData]);

    // 3. Hàm xử lý file upload
    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const newFiles = Array.from(files).map(file => ({
                file: file, // Store the actual File object
                name: file.name,
                size: (file.size / 1024).toFixed(0),
                date: new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }),
                type: file.type
            }));
            setAttachments(prev => [...prev, ...newFiles]);
        }
    };

    // 4. Hàm xóa file
    const handleRemoveFile = (indexToRemove) => {
        setAttachments(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleCancel = () => {
        setForm({ ...SceneProtectionDto, caseId });
        setSelectedOfficer('');
        setAttachments([]); // Reset attachments
        if (onCancel) {
            onCancel();
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

    const getFileExtensionBadge = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    const map = {
        png: 'bg-danger',
        jpg: 'bg-danger',
        jpeg: 'bg-danger',
        gif: 'bg-danger',
        pdf: 'bg-primary',
        doc: 'bg-info',
        docx: 'bg-info',
        mp4: 'bg-warning text-dark'
    };
    return map[ext] || 'bg-secondary';
};

    return (
        <Card className="mx-auto" style={{ maxWidth: '900px' }}>
            <Card.Header style={{ backgroundColor: '#C8E3FF' }} className="text-dark">
                <div className='text-center' style={{fontSize: '24px', fontWeight: 'bold'}}>INFORMATION PROTECTION FIELD</div>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">RESPONSIBLE UNIT / OFFICER</Form.Label>
                        <Form.Control
                            name="officerUserName"
                            value={selectedOfficer}
                            readOnly
                            placeholder="Click to select officer..."
                            onClick={() => setShowOfficerModal(true)}
                            style={{ cursor: 'pointer' }}
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Label className="fw-bold">TIME OF ARRIVAL AT THE SCENE</Form.Label>
                        <Col xs={12}>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label className="mb-0">Start time</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="startTime"
                                    value={form.startTime}
                                    onChange={handleChange}
                                    required
                                    style={{ maxWidth: '100px', maxHeight: '40px' }}
                                />
                            </div>
                        </Col>

                        <Col xs={12}>
                            <div className="d-flex justify-content-between align-items-center">
                                <Form.Label className="mb-0">End time</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="endTime"
                                    value={form.endTime}
                                    onChange={handleChange}
                                    required
                                    style={{ maxWidth: '100px', maxHeight: '40px' }}
                                />
                            </div>
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
                        <Form.Label className="fw-bold">SCENE SKETCH / ATTACHMENTS (Optional)</Form.Label>

                        {/* File upload area */}
                        <div 
                            className="border border-dashed p-4 text-center mb-3"
                            style={{ borderColor: '#ddd', borderRadius: '8px', cursor: 'pointer' }}
                            onClick={() => document.getElementById('sceneFileInput').click()}
                        >
                            <input
                                id="sceneFileInput"
                                type="file"
                                multiple
                                accept="image/*,.pdf,.doc,.docx"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                            <i className="bi bi-cloud-upload" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
                            <div className="mt-2">
                                <strong>Drag & drop files or Browse</strong>
                            </div>
                            <small className="text-muted">
                                Supported formats: JPEG, PNG, PDF, DOC, DOCX
                            </small>
                        </div>

                        {/* Attached files list */}
                        {attachments.length > 0 && (
                            <div className="mb-3">
                                <strong>Attached Files:</strong>
                                <div className="mt-2">
                                    {attachments.map((attachment, index) => (
                                        <div key={index} className="d-flex justify-content-between align-items-center p-2 border rounded mb-2">
                                            <div className="d-flex align-items-center">
                                                <span className={`badge ${getFileExtensionBadge(attachment.name)} me-2`}>
                                                    {attachment.name.split('.').pop().toUpperCase()}
                                                </span>
                                                <div>
                                                    <div className="fw-bold">{attachment.name}</div>
                                                    <small className="text-muted">{attachment.size} KB · {attachment.date}</small>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleRemoveFile(index)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" type="button" onClick={handleCancel}>Cancel</Button>
                        <Button variant="primary" type="submit">Save</Button>
                    </div>
                </Form>
            </Card.Body>
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
        </Card>


    );
};

export default SceneProtectionForm;