import React, { useRef, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/medical.css";

const MedicalSupportForm = () => {
  const [time, setTime] = useState("08:30");
  const [ampm, setAmPm] = useState("AM");
  const navigate = useNavigate();

  const sceneSketchInputRef = useRef();

const handleSceneSketchUpload = () => {
  sceneSketchInputRef.current.click();
};

  const fileInputRef = useRef();

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };


  const toggleAmPm = () => {
    setAmPm((prev) => (prev === "AM" ? "PM" : "AM"));
  };

  return (
    <div className="medical-container">
      <div className="medical-form-wrapper">
        <div className="form-header">MEDICAL/RESCUE SUPPORT</div>

        <Form className="form-body">
          <Form.Group className="mb-4" controlId="unitId">
            <Form.Label>MEDICAL/RESCUE UNIT ID</Form.Label>
            <Form.Control type="text" placeholder="RES-Q1232983" />
          </Form.Group>

          <Form.Group className="mb-4" controlId="supportType">
            <Form.Label>TYPE OF SUPPORT PROVIDED</Form.Label>
            <Form.Control type="text" placeholder="Patrol Officer" />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-4" controlId="personnelAssigned">
                <Form.Label>PERSONNEL ASSIGNED</Form.Label>
                <Form.Control type="text" placeholder="John, Johnson" />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-4" controlId="arrivalTime">
                <Form.Label>TIME OF ARRIVAL</Form.Label>
                <div className="time-input-container">
                  <Form.Control
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                  <Button onClick={toggleAmPm}>{ampm}</Button>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="locationAssigned">
            <Form.Label>LOCATION ASSIGNED</Form.Label>
            <Form.Control type="text" placeholder="John, Johnson" />
          </Form.Group>

          <Form.Group className="mb-4" controlId="remarks">
            <Form.Label>REMARKS/NOTES</Form.Label>
            <Form.Control type="text" placeholder="No hand, out of blood,..." />
          </Form.Group>

          <div className="upload-header">
            <Form.Label>SCENE SKETCH</Form.Label>
            <Button variant="secondary" onClick={handleSceneSketchUpload}>UPLOAD</Button>
            <input
              type="file"
              ref={sceneSketchInputRef}
              style={{ display: "none" }}
              accept=".jpeg,.jpg,.png,.gif,.pdf"
            />
          </div>

          <Form.Group controlId="fileUpload">
            <div
              className="file-upload-area"
              onClick={handleBrowseClick}
              onDragOver={(e) => e.preventDefault()}
            >
              Drag & drop files or <span className="browse">Browse</span>
              <div className="formats">
                Supported: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              style={{ display: "none" }}
              accept=".jpeg,.jpg,.png,.gif,.mp4,.pdf,.psd,.ai,.doc,.docx,.ppt,.pptx"
            />
          </Form.Group>;
        </Form>

        <div className="form-actions">
          <Button className="btn-cancel" onClick={() => navigate("/home")}>
            Cancel
          </Button>
          <Button className="btn-save">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default MedicalSupportForm;

