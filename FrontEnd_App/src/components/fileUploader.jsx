import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Form } from 'react-bootstrap';
import { CloudUpload } from 'react-bootstrap-icons';

const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

const FileUploader = ({ onFileSelected }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        const fileNames = acceptedFiles.map(file => file.name);
        setSelectedFiles(prev => [...prev, ...acceptedFiles]);

        const combined = fileNames.join(','); // Gộp tên file cách nhau bằng dấu phẩy
        onFileSelected && onFileSelected(combined);
    }, [onFileSelected]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        accept: {
            'image/*': [],
            'application/pdf': [],
            'application/msword': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
            'application/vnd.ms-powerpoint': [],
            'video/mp4': []
        }
    });

    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Label className="fw-bold">ATTACHMENT</Form.Label>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    style={{ backgroundColor: '#C8E3FF' }}
                    onClick={() => document.querySelector('#fileInput').click()}
                >
                    Upload <CloudUpload className="ms-1" />
                </button>
            </div>

            {/* Dropzone */}
            <div
                {...getRootProps()}
                className="dropzone-area"
                style={{
                    border: '2px dashed #cbd5e0',
                    backgroundColor: '#f1f1f1',
                    padding: '30px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    borderRadius: '6px',
                }}
            >
                <input {...getInputProps()} id="fileInput" />
                <CloudUpload size={40} className="text-primary mb-3" />
                <p className="mb-1">
                    Drag & drop files or <span className="text-primary fw-semibold">Browse</span>
                </p>
                <small className="text-muted">
                    Supported formats: JPEG, PNG, GIF, MP4, PDF, Word, PPT
                </small>
            </div>

            {/* Preview list */}
            <div className="mt-3 d-flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => (
                    <div
                        key={index}
                        className="px-3 py-2"
                        style={{
                            backgroundColor: '#eeeeee',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '48%' // nhỏ lại 50%
                        }}
                    >
                        <div style={{
                            backgroundColor: '#f44336',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            padding: '4px 6px',
                            borderRadius: '4px',
                            minWidth: '40px',
                            textAlign: 'center'
                        }}>
                            {file.name.split('.').pop().toUpperCase()}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                                className="fw-semibold"
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                title={file.name}
                            >
                                {file.name}
                            </div>
                            <div className="text-muted" style={{ fontSize: '14px' }}>
                                {formatFileSize(file.size)} &nbsp;•&nbsp; {formatDate(file.lastModifiedDate || new Date())}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUploader;
