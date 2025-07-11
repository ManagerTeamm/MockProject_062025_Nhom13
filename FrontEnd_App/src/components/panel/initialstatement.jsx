import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import sampleStatement from "../../samples/sameplestatement";
import "../../styles/initialstatement.css";
import { useForm } from "react-hook-form";

const StatementForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const data = sampleStatement;

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    const fileObjects = files.map((file) => ({
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024).toFixed(1)}KB`,
      date: new Date().toISOString().split("T")[0],
      url: URL.createObjectURL(file),
    }));

    setUploadedFiles((prev) => [...prev, ...fileObjects]);
  };

  const onSubmit = (formData) => {
    console.log("Submitted Data:", formData);
    // Save logic goes here
  };

  return (
    <div className="statement-main">
      <div className="statement-title">
        VIEW <span>INITIAL STATEMENT</span>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Initial Information */}
        <div className="statement-box">
          <div className="section-title">Initial Information</div>
          <div className="section-content">
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Initial Name</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={data.name}
                    {...register("initialName", {
                      required: "Initial Name is required",
                    })}
                  />
                  {errors.initialName && (
                    <small className="text-danger">
                      {errors.initialName.message}
                    </small>
                  )}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={data.date}
                    {...register("date", { required: "Date is required" })}
                  />
                  {errors.date && (
                    <small className="text-danger">{errors.date.message}</small>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contact Information</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={data.contact}
                    {...register("contact", {
                      required: "Contact info is required",
                      pattern: {
                        value: /^\+\d{10,15}$/,
                        message:
                          "Must start with '+' and be 10–15 digits long",
                      },
                    })}
                  />
                  {errors.contact && (
                    <small className="text-danger">
                      {errors.contact.message}
                    </small>
                  )}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Select defaultValue={data.role} {...register("role")}>
                    <option>Witness</option>
                    <option>Victim</option>
                    <option>Suspect</option>
                    <option>Officer</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </div>

        {/* Detailed Statement */}
        <div className="statement-box">
          <div className="section-title">Detailed Statement</div>
          <div className="section-content">
            <Form.Label className="sub-label">
              Content of the Statement
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              defaultValue={data.content}
              {...register("content", {
                required: "Statement content is required",
                minLength: {
                  value: 20,
                  message: "Must be at least 20 characters",
                },
              })}
            />
            {errors.content && (
              <small className="text-danger">{errors.content.message}</small>
            )}
          </div>
        </div>

        {/* Evidence Link */}
        <div className="statement-box">
          <div className="section-title d-flex justify-content-between">
            <span>Evidence Link</span>
            <Form.Group controlId="uploadFile">
              <Form.Label className="mb-0">Upload File</Form.Label>
              <Form.Control
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e)}
              />
            </Form.Group>
          </div>

          <div className="file-grid">
            {[...(data.files || []), ...uploadedFiles].map((file, idx) => (
              <div key={idx} className="file-box">
                <div className="file-info">
                  <div className="file-name">
                    <a
                      href={file.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.name}
                    </a>
                  </div>
                  <div className="file-meta">
                    {file.type} • {file.size} • {file.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="statement-actions">
          <Button variant="secondary" type="button">
            Back
          </Button>
          <Button className="btn-save" type="submit">
            Save
          </Button>
          <Button variant="danger" type="button">
            Delete
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default StatementForm;
