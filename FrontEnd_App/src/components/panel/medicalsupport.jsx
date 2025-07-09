import React from "react";
import { Form, Button } from "react-bootstrap";

const MedicalSupportForm = () => (
  <div className="panel-right">
    <h5>Medical/Rescue Support</h5>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Medical/Rescue Unit ID</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Type of Support Provided</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <div className="d-flex align-items-end mb-3">
        <Form.Group className="me-3">
          <Form.Label>Personnel Assigned</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Time of Arrival</Form.Label>
          <Form.Control type="time" />
        </Form.Group>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Location Assigned</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Remarks/Notes</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Scene Sketch</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      <Form.Group className="mb-3 file-drop-zone">
        <Form.Label>Upload Files</Form.Label>
        <div className="drop-area">
          Drag & Drop or <span className="text-primary">Browse</span>
        </div>
        <div className="text-muted small">Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT</div>
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </Form>
  </div>
);

export default MedicalSupportForm;
