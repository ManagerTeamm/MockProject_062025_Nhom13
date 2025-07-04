import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const InitialEvidenceForm = ({ initialData, onSubmit, onCancel }) => {
    const isEditing = Boolean(initialData);
    const [typeOfEvidence, setTypeOfEvidence] = useState('');
    const [evidenceLocation, setEvidenceLocation] = useState('');
    const [evidenceDescription, setEvidenceDescription] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [showSubmitMessage, setShowSubmitMessage] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTypeOfEvidence(initialData.typeOfEvidence || '');
            setEvidenceLocation(initialData.evidenceLocation || '');
            setEvidenceDescription(initialData.evidenceDescription || '');
            setAttachments(initialData.attachments || []);
        } else {
            setTypeOfEvidence('');
            setEvidenceLocation('');
            setEvidenceDescription('');
            setAttachments([]);
        }
    }, [initialData]);

    const evidenceTypes = [
        { value: '', label: 'Select an option' },
        { value: 'physical', label: 'Physical Evidence' },
        { value: 'bilogical', label: 'Biological Evidence' },
        { value: 'trace', label: 'Trace Evidence' },
        { value: 'documantary', label: 'Documentary Evidence' },
        { value: 'digital', label: 'Digital evidence' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'typeOfEvidence') setTypeOfEvidence(value);
        if (name === 'evidenceLocation') setEvidenceLocation(value);
        if (name === 'evidenceDescription') setEvidenceDescription(value);
    };

    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const newFiles = Array.from(files).map(file => ({
                name: file.name,
                size: (file.size / 1024).toFixed(0),
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                type: file.type
            }));
            setAttachments(prev => [...prev, ...newFiles]);
        }
    };

    const handleRemoveAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const handleCreate = () => {
        const formData = { typeOfEvidence, evidenceLocation, evidenceDescription, attachments };
        if (onSubmit) onSubmit(formData);
        setShowSubmitMessage(true);
        setTimeout(() => setShowSubmitMessage(false), 3000);
    };

    const handleCancel = () => {
        if (onCancel) onCancel();
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
            ppt: 'bg-info',
            pptx: 'bg-info',
            mp4: 'bg-warning text-dark',
            ai: 'bg-secondary',
            psd: 'bg-secondary'
        };
        return map[ext] || 'bg-secondary';
    };

    return (
        <div className="container" style={{ maxWidth: '760px' }}>
            <div className="bg-white">
                <h3 className="text-center mb-1">Initial Evidence</h3>
                <p className="text-center text-muted mb-4">
                    This form is used to document the initial evidence connected to the incident.
                </p>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Types of Evidence <span className="text-danger">*</span></label>
                        <select
                            className="form-select"
                            name="typeOfEvidence"
                            value={typeOfEvidence}
                            onChange={handleChange}
                            required
                        >
                            {evidenceTypes.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Evidence Location</label>
                        <input
                            type="text"
                            className="form-control"
                            name="evidenceLocation"
                            placeholder="E.g., At the scene, in the car,…"
                            value={evidenceLocation}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="form-label">Evidence Description</label>
                    <textarea
                        className="form-control"
                        name="evidenceDescription"
                        rows="4"
                        placeholder="Provide a clear and detailed description of the evidence (shape, material, identifying features...)"
                        value={evidenceDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <h5>Attachments</h5>
                    <div
                        className="p-4 border rounded text-center mb-3"
                        style={{ backgroundColor: '#f7f7f7', borderStyle: 'dashed' }}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <i className="bi bi-cloud-upload fs-1 text-muted"></i>
                        <p className="my-2">Drag & drop files or <span className="text-primary">Browse</span></p>
                        <p className="text-muted small">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</p>
                        <input
                            type="file"
                            id="fileInput"
                            multiple
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                    </div>

                    {attachments.length > 0 && (
                        <div className="row g-2">
                            {attachments.map((file, idx) => (
                                <div className="col-md-6" key={idx}>
                                    <div className="d-flex align-items-center p-2 border rounded bg-light">
                                        <span className={`badge ${getFileExtensionBadge(file.name)} me-2`}>
                                            {file.name.split('.').pop()}
                                        </span>
                                        <div className="flex-grow-1">
                                            <div className="fw-semibold text-truncate">{file.name}</div>
                                            <small className="text-muted">{file.size} KB · {file.date}</small>
                                        </div>
                                        <button
                                            className="btn-close ms-auto"
                                            onClick={() => handleRemoveAttachment(idx)}
                                        ></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                    <button className="btn btn-secondary px-4 py-2" onClick={handleCancel}>Cancel</button>
                    <button className="btn btn-dark px-4 py-2" onClick={handleCreate}>{isEditing ? 'Update' : 'Create'}</button>
                </div>
            </div>
        </div>
    );
};

export default InitialEvidenceForm;
