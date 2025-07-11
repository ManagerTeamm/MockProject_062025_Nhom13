import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Upload, X } from 'lucide-react';
import '../css/imageAndVideo.css';
import { useDropzone } from 'react-dropzone';

const ImageAndVideo = () => {
  const [dateTaken, setDateTaken] = useState('');
  const [description, setDescription] = useState('');
  const [capturedBy, setCapturedBy] = useState('');
  const [sceneSketchFiles, setSceneSketchFiles] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);

  // Dropzone configuration for scene sketches
  const sceneSketchDropzone = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    onDrop: (acceptedFiles) => {
      setSceneSketchFiles([
        ...sceneSketchFiles,
        ...acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      ]);
    }
  });

  // Dropzone configuration for media files
  const mediaDropzone = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm', '.mov'],
      'application/pdf': ['.pdf']
    },
    onDrop: (acceptedFiles) => {
      setMediaFiles([
        ...mediaFiles,
        ...acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      ]);
    }
  });

  // Handle choosing date through the browse button
  const handleDateBrowse = () => {
    document.getElementById('date-input').focus();
  };

  // Handle choosing files through the browse button for scene sketch
  const handleSceneSketchBrowse = () => {
    document.getElementById('scene-sketch-input').click();
  };

  // Handle choosing files through the browse button for media
  const handleMediaBrowse = () => {
    document.getElementById('media-input').click();
  };

  // Remove a scene sketch file
  const removeSceneSketch = (index) => {
    const newFiles = [...sceneSketchFiles];
    newFiles.splice(index, 1);
    setSceneSketchFiles(newFiles);
  };

  // Remove a media file
  const removeMedia = (index) => {
    const newFiles = [...mediaFiles];
    newFiles.splice(index, 1);
    setMediaFiles(newFiles);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the files and form data to your backend
    const formData = {
      dateTaken,
      description,
      capturedBy,
      sceneSketchFiles,
      mediaFiles
    };
    
    console.log('Form submitted with data:', formData);
    // You would use your API service here to send the data
  };

  return (
    <div className="card mb-4 images-video-container">
      <div className="card-header images-video-header">
        <h5 className="mb-0">IMAGES AND VIDEO</h5>
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          {/* DATE TAKEN */}
          <div className="mb-4">
            <label className="form-label">DATE TAKEN</label>
            <div className="d-flex align-items-center">
              <div className="flex-grow-1 me-3">
                <div className="date-container">
                  <input 
                    id="date-input" 
                    type="date" 
                    className="form-control"
                    value={dateTaken}
                    onChange={(e) => setDateTaken(e.target.value)}
                    placeholder="dd/mm/yyyy"
                  />
                  <i className="bi bi-calendar3 calendar-icon"></i>
                </div>
              </div>
              <button 
                type="button" 
                className="btn choose-btn" 
                onClick={handleDateBrowse}
              >
                <i className="bi bi-calendar3 me-2"></i>
                Choose
              </button>
            </div>
          </div>

          {/* SCENE SKETCH */}
          <div className="mb-4">
            <label className="form-label">SCENE SKETCH</label>
            <div className="d-flex align-items-start">
              <div className="flex-grow-1 me-3">
                <div {...sceneSketchDropzone.getRootProps()} className="dropzone-area">
                  <input {...sceneSketchDropzone.getInputProps()} id="scene-sketch-input" />
                  <div className="sketch-grid">
                    {sceneSketchFiles.length > 0 ? (
                      sceneSketchFiles.slice(0, 4).map((file, index) => (
                        <div key={index} className="text-center position-relative">
                          <button 
                            type="button" 
                            className="btn-close-small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSceneSketch(index);
                            }}
                          >
                            <X size={16} />
                          </button>
                          <img 
                            src={file.preview} 
                            alt={`Sketch ${index + 1}`} 
                            className="img-thumbnail" 
                            style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                          />
                          <p className="small text-muted mt-1">Drag & drop files or <span className="text-primary">Browse</span></p>
                        </div>
                      ))
                    ) : (
                      Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="text-center">
                          <div className="dropzone-placeholder">
                            <div className="circle-icon">
                              <Upload size={20} />
                            </div>
                            <p className="small text-muted mt-1">Drag & drop files or <span className="text-primary">Browse</span></p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <button 
                type="button" 
                className="btn upload-btn" 
                onClick={handleSceneSketchBrowse}
              >
                <i className="bi bi-upload me-2"></i>
                UPLOAD
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label className="form-label">DESCRIPTION</label>
            <textarea
              className="form-control"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description here..."
            />
          </div>

          {/* CAPTURED BY */}
          <div className="mb-4">
            <label className="form-label">CAPTURED BY</label>
            <input 
              type="text" 
              className="form-control"
              value={capturedBy}
              onChange={(e) => setCapturedBy(e.target.value)}
              placeholder="Enter name..."
            />
          </div>

          {/* PREVIEW MODAL */}
          <div className="mb-4">
            <label className="form-label">PREVIEW MODAL</label>
            <div className="d-flex align-items-start">
              <div className="flex-grow-1 me-3">
                <div {...mediaDropzone.getRootProps()} className="media-preview-wrapper">
                  <input {...mediaDropzone.getInputProps()} id="media-input" />
                  {mediaFiles.length > 0 ? (
                    <div className="media-grid">
                      {mediaFiles.map((file, idx) => (
                        <div key={idx} className="text-center position-relative">
                          <button 
                            type="button" 
                            className="btn-close-small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              removeMedia(idx);
                            }}
                          >
                            <X size={16} />
                          </button>
                          {file.type && file.type.startsWith('video') ? (
                            <video 
                              src={file.preview} 
                              controls 
                              style={{ width: '100%', maxHeight: '120px' }}
                            />
                          ) : (
                            <img 
                              src={file.preview} 
                              alt={`Media ${idx + 1}`} 
                              className="img-thumbnail"
                              style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100%' }}>
                      <div className="circle-icon mb-2" style={{ width: '60px', height: '60px' }}>
                        <Upload size={30} color="#6c757d" />
                      </div>
                      <p className="mb-1">Drag & drop files or <span className="text-primary">Browse</span></p>
                      <p className="small text-muted">Supported: JPEG, PNG, GIF, MP4, PDF, MOV, JPG</p>
                    </div>
                  )}
                </div>
              </div>
              <button 
                type="button" 
                className="btn upload-btn" 
                onClick={handleMediaBrowse}
              >
                <i className="bi bi-upload me-2"></i>
                UPLOAD
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="d-flex justify-content-center gap-3 mt-5">
            <button type="button" className="btn btn-secondary px-4">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary px-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageAndVideo;
