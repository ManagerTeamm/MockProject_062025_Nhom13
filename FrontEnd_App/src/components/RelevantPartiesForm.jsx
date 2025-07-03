import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

const RelevantPartiesForm = () => {
    // State cho các trường nhập liệu
    const [fullName, setFullName] = useState('');
    const [relationship, setRelationship] = useState('');
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [contact, setContact] = useState('');
    const [statement, setStatement] = useState('');
    const [attachments, setAttachments] = useState([]); 
    const [showSubmitMessage, setShowSubmitMessage] = useState(false); 
    
    const relationshipOptions = [
        { value: '', label: 'Select an option' },
        { value: 'victim', label: 'Victim' },
        { value: 'suspect', label: 'Suspect' },
        { value: 'witness', label: 'Witness' },
        { value: 'other', label: 'Other' },
    ];

    const genderOptions = [
        { value: '', label: 'Select an option' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'fullName':
                setFullName(value);
                break;
            case 'relationship':
                setRelationship(value);
                break;
            case 'gender':
                setGender(value);
                break;
            case 'nationality':
                setNationality(value);
                break;
            case 'contact':
                setContact(value);
                break;
            case 'statement':
                setStatement(value);
                break;
            default:
                break;
        }
    };

    
    const getFileExtensionBadge = (fileName) => {
        const parts = fileName.split('.');
        if (parts.length > 1) {
            const ext = parts[parts.length - 1].toLowerCase();
            switch (ext) {
                case 'png':
                case 'jpg':
                case 'jpeg':
                case 'gif':
                    return 'bg-danger'; 
                case 'pdf':
                    return 'bg-primary';
                case 'doc':
                case 'docx':
                case 'ppt':
                case 'pptx':
                    return 'bg-info'; 
                case 'mp4':
                    return 'bg-warning text-dark'; 
                case 'ai':
                case 'psd':
                    return 'bg-secondary'; 
                default:
                    return 'bg-secondary';
            }
        }
        return 'bg-secondary';
    };

    
    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const newFiles = Array.from(files).map(file => ({
                name: file.name,
                size: (file.size / 1024).toFixed(0), 
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '),
                type: file.type
            }));
            setAttachments(prevAttachments => [...prevAttachments, ...newFiles]);
        }
    };

  
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        handleFileUpload({ target: { files } });
    };

    const handleRemoveAttachment = (index) => {
        setAttachments(prevAttachments => prevAttachments.filter((_, i) => i !== index));
    };

  
    const handleCreate = () => {
        console.log("Form Data:", {
            fullName,
            relationship,
            gender,
            nationality,
            contact,
            statement,
            attachments
        });
        setShowSubmitMessage(true);
        setTimeout(() => {
            setShowSubmitMessage(false);
        }, 3000);
    };

   
    const handleCancel = () => {
        setFullName('');
        setRelationship('');
        setGender('');
        setNationality('');
        setContact('');
        setStatement('');
        setAttachments([]);
        setShowSubmitMessage(false);
        console.log('Form cancelled and reset.');
    };

    return (
       
        <div className="container-fluid d-flex justify-content-center align-items-center py-5" style={{ minHeight: '100vh', backgroundColor: '#343a40' }}>
            
            <div className="card shadow-lg p-4 my-4" style={{ 
                maxWidth: '600px', 
                width: '100%',
                borderRadius: '15px',
                backgroundColor: '#ffffff',
                
                boxSizing: 'border-box'
            }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-1" style={{ color: '#333' }}>Relevant Parties</h2>
                    <p className="text-center text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                        This form is used to document the roles and identities of all parties connected to the incident.
                    </p>

                    {showSubmitMessage && (
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            Form submitted successfully! Check console for data.
                            <button type="button" className="btn-close" onClick={() => setShowSubmitMessage(false)} aria-label="Close"></button>
                        </div>
                    )}

                    <div className="row g-4">
                        <div className="col-md-6">
                            <label htmlFor="fullName" className="form-label">Full name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                name="fullName"
                                placeholder="E.g., John Michael Doe"
                                value={fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="relationship" className="form-label">Relationship to the incident <span className="text-danger">*</span></label>
                            <select
                                className="form-select"
                                id="relationship"
                                name="relationship"
                                value={relationship}
                                onChange={handleChange}
                                required
                            >
                                {relationshipOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select
                                className="form-select"
                                id="gender"
                                name="gender"
                                value={gender}
                                onChange={handleChange}
                            >
                                {genderOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="nationality" className="form-label">Nationality</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nationality"
                                name="nationality"
                                placeholder="E.g., American"
                                value={nationality}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="contact" className="form-label">Contact</label>
                            <input
                                type="text"
                                className="form-control"
                                id="contact"
                                name="contact"
                                placeholder="E.g., +1234567890 or email@example.com"
                                value={contact}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="statement" className="form-label">Statement / Description</label>
                            <textarea
                                className="form-control"
                                id="statement"
                                name="statement"
                                rows="5"
                                placeholder="Provide a clear and detailed description of what happened, including dates, times, locations, and people involved."
                                value={statement}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                    <h5 className="mt-4 mb-3" style={{ color: '#333' }}>Attachments</h5>
                    <div
                        className="file-upload-area p-5 border border-dashed rounded text-center mb-3"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        style={{ borderColor: '#d1d1d1', backgroundColor: '#f9f9f9', cursor: 'pointer' }}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <i className="bi bi-cloud-upload fs-1 text-muted"></i>
                        <p className="mb-1 mt-2 text-dark">Drag & drop files or <span className="text-primary fw-bold">Browse</span></p>
                        <p className="text-muted" style={{ fontSize: '0.85rem' }}>Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</p>
                        <input
                            type="file"
                            id="fileInput"
                            multiple
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {attachments.length > 0 && (
                        <div className="uploaded-files mt-3">
                            <h6 className="mb-2">Uploaded:</h6>
                            <div className="row g-2">
                                {attachments.map((file, index) => (
                                    <div key={index} className="col-md-6">
                                        <div className="d-flex align-items-center p-2 border rounded bg-light">
                                            <span className={`badge ${getFileExtensionBadge(file.name)} me-2 text-uppercase`}>
                                                {file.name.split('.').pop()}
                                            </span>
                                            <div>
                                                <div className="fw-semibold text-truncate" style={{ maxWidth: '180px' }}>{file.name}</div>
                                                <small className="text-muted">{file.size} KB · {file.date}</small>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-close ms-auto"
                                                aria-label="Remove"
                                                onClick={(e) => { e.stopPropagation(); handleRemoveAttachment(index); }}
                                            ></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button type="button" className="btn btn-secondary px-4 py-2" onClick={handleCancel}>Cancel</button>
                        <button type="button" className="btn btn-dark px-4 py-2" onClick={handleCreate}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelevantPartiesForm;