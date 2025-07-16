import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/MedicalSupportForm.module.css";
import FileUploader from './fileUploader';

const MedicalSupportForm = ({ onSave, onCancel, editData }) => {
    const [formData, setFormData] = useState({
        unitId: '',
        supportType: '',
        personnelAssigned: '',
        arrivalTime: '08:30',
        locationAssigned: '',
        remarks: '',
        attachment: null
    });

    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        if (editData) {
            let timeValue = '08:30';
            let ampmValue = 'AM';

            if (editData.arrivalTime) {
                const timeMatch = editData.arrivalTime.match(/(\d{2}:\d{2})\s*(AM|PM)/i);
                if (timeMatch) {
                    timeValue = timeMatch[1];
                    ampmValue = timeMatch[2].toUpperCase();
                }
            }

            setFormData({
                unitId: editData.unitId || '',
                supportType: editData.supportType || '',
                personnelAssigned: editData.personnelAssigned || '',
                arrivalTime: timeValue,
                locationAssigned: editData.locationAssigned || '',
                remarks: editData.remarks || '',
                attachment: editData.attachment || null,
                attachmentFilePaths: editData.attachmentFilePaths || ''
            });

            setAmPm(ampmValue);

            if (editData.attachment) {
                if (Array.isArray(editData.attachment)) {
                    setAttachments(editData.attachment);
                } else if (typeof editData.attachment === 'string') {
                    setAttachments([editData.attachment]);
                }
            }
        }
    }, [editData]);

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

    const handleRemoveFile = (indexToRemove) => {
        setAttachments(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const [ampm, setAmPm] = useState("AM");

    const toggleAmPm = () => {
        setAmPm((prev) => (prev === "AM" ? "PM" : "AM"));
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        if (!formData.unitId || !formData.supportType || !formData.arrivalTime) {
            alert('Please fill in all required fields.');
            return;
        }

        const formattedTime = `${formData.arrivalTime} ${ampm}`;

        const dataToSave = {
            ...formData,
            arrivalTime: formattedTime,
            attachment: attachments
        };

        setFormData({
            unitId: '',
            supportType: '',
            personnelAssigned: '',
            arrivalTime: '08:30',
            locationAssigned: '',
            remarks: '',
            attachment: null
        });
        setAmPm("AM");
        setAttachments([]);

        onSave(dataToSave);
    };

    const handleCancel = () => {
        setFormData({
            unitId: '',
            supportType: '',
            personnelAssigned: '',
            arrivalTime: '08:30',
            locationAssigned: '',
            remarks: '',
            attachment: null
        });
        setAmPm("AM");
        setAttachments([]);

        if (onCancel) {
            onCancel();
        }
    };
    const getFileExtensionBadge = (fileName) => {
        // Kiểm tra xem fileName có tồn tại và có phải là string không
        if (!fileName || typeof fileName !== 'string') {
            return 'bg-secondary'; // Default badge color
        }

        const ext = fileName.split('.').pop()?.toLowerCase();

        // Kiểm tra xem ext có tồn tại không
        if (!ext) {
            return 'bg-secondary';
        }

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
        <div className={styles.medicalFormWrapper}>
            <div className={styles.formHeader}>MEDICAL/RESCUE SUPPORT</div>

            <Form className={styles.formBody}>
                <Form.Group className="mb-4" controlId="unitId">
                    <Form.Label>MEDICAL/RESCUE UNIT ID <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="RES-Q1232983"
                        value={formData.unitId}
                        onChange={(e) => handleInputChange('unitId', e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="supportType">
                    <Form.Label>TYPE OF SUPPORT PROVIDED <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Emergency Medical Care, First Aid, etc."
                        value={formData.supportType}
                        onChange={(e) => handleInputChange('supportType', e.target.value)}
                        required
                    />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-4" controlId="personnelAssigned">
                            <Form.Label>PERSONNEL ASSIGNED</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="John, Johnson"
                                value={formData.personnelAssigned}
                                onChange={(e) => handleInputChange('personnelAssigned', e.target.value)}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-4" controlId="arrivalTime">
                            <Form.Label>TIME OF ARRIVAL <span className="text-danger">*</span></Form.Label>
                            <div className={styles.timeInputContainer}>
                                <Form.Control
                                    type="time"
                                    value={formData.arrivalTime}
                                    onChange={(e) => handleInputChange('arrivalTime', e.target.value)}
                                    required
                                />
                                <Button onClick={toggleAmPm}>{ampm}</Button>
                            </div>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-4" controlId="locationAssigned">
                    <Form.Label>LOCATION ASSIGNED</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter specific location"
                        value={formData.locationAssigned}
                        onChange={(e) => handleInputChange('locationAssigned', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-4" controlId="remarks">
                    <Form.Label>REMARKS/NOTES</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Additional notes or observations..."
                        value={formData.remarks}
                        onChange={(e) => handleInputChange('remarks', e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>SCENE SKETCH (Optional)</Form.Label>

                    <div
                        className="border border-dashed p-4 text-center mb-3"
                        style={{ borderColor: '#ddd', borderRadius: '8px', cursor: 'pointer' }}
                        onClick={() => document.getElementById('medicalFileInput').click()}
                    >
                        <input
                            id="medicalFileInput"
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

                    {formData.attachmentFilePaths?.length > 0 && (
                            <>
                                <h6>Saved files</h6>
                                {formData.attachmentFilePaths.map((file, index) => (
                                    <div key={index} className="d-flex justify-content-between align-items-center p-2 border rounded mb-2">
                                        <div className="d-flex align-items-center">
                                            <a href={file}>{file}</a>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                </Form.Group>
            </Form>

            <div className={styles.formActions}>
                <Button className={styles.btnCancel} onClick={handleCancel}>
                    Cancel
                </Button>
                <Button className={styles.btnSave} onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
};

export default MedicalSupportForm;