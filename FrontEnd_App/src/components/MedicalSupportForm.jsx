import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/MedicalSupportForm.module.css";
import FileUploader from './fileUploader';

const AttachmentList = ({ attachments, onRemove }) => {
    const getFileNameFromBase64 = (base64String, index) => {
        return `attachment_${index + 1}`;
    };

    const getFileTypeFromBase64 = (base64String) => {
        const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,/);
        return matches ? matches[1] : 'unknown';
    };

    const downloadFile = (base64String, fileName) => {
        const link = document.createElement('a');
        link.href = base64String;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.attachmentList}>
            {attachments.map((attachment, index) => (
                <div key={index} className={`${styles.attachmentItem} d-flex justify-content-between align-items-center p-2 border rounded mb-2`}>
                    <div className={styles.fileInfo}>
                        <span className={styles.fileName}>{getFileNameFromBase64(attachment, index)}</span>
                        <small className="text-muted ms-2">({getFileTypeFromBase64(attachment)})</small>
                    </div>
                    <div className={styles.fileActions}>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => downloadFile(attachment, getFileNameFromBase64(attachment, index))}
                        >
                            Download
                        </Button>
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onRemove(index)}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

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
                attachment: editData.attachment || null
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