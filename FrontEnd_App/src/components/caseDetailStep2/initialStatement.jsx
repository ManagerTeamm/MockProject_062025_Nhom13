// StatementForm.jsx
import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styles from "../../styles/initialstatement.module.css";

const StatementForm = ({ initialData = {}, onSubmit, onCancel, onDelete }) => {
  const { register, handleSubmit, formState: { errors } } =
    useForm({
      defaultValues: {
        initialName: initialData.name || "",
        date: initialData.date || "",
        contact: initialData.contact || "",
        role: initialData.role || "Witness",
        content: initialData.content || "",
      },
    });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const fileObjects = files.map((file) => ({
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024).toFixed(1)}KB`,
      date: new Date().toISOString().split("T")[0],
      url: URL.createObjectURL(file),
    }));
    setUploadedFiles((prev) => [...prev, ...fileObjects]);
  };

  const handleFormSubmit = (formData) => {
    const allFiles = [...(initialData.files || []), ...uploadedFiles];
    const result = { ...formData, files: allFiles };
    if (onSubmit) onSubmit(result);
    else console.log("Statement Submitted:", result);
  };

  return (
    <div className={styles.statementMain}>
      <div className={styles.statementTitle}>
        {initialData.id ? "EDIT" : "ADD"} <span>INITIAL STATEMENT</span>
      </div>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Initial Information */}
        <div className={styles.statementBox}>
          <div className={styles.sectionTitle}>Initial Information</div>
          <div className={styles.sectionContent}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Initial Name</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    type="text"
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
                    className={styles.formControl}
                    type="date"
                    {...register("date", { required: "Date is required" })}
                  />
                  {errors.date && (
                    <small className="text-danger">
                      {errors.date.message}
                    </small>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contact Information</Form.Label>
                  <Form.Control
                    className={styles.formControl}
                    type="text"
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
                  <Form.Select {...register("role")}>
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
        <div className={styles.statementBox}>
          <div className={styles.sectionTitle}>Detailed Statement</div>
          <div className={styles.sectionContent}>
            <Form.Label className={styles.subLabel}>
              Content of the Statement
            </Form.Label>
            <Form.Control
              className={styles.formControl}
              as="textarea"
              rows={6}
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

        {/* Evidence Upload */}
        <div className={styles.statementBox}>
          <div
            className={`${styles.sectionTitle} d-flex justify-content-between align-items-center`}
          >
            <span>Evidence Link</span>
            <Form.Group controlId="uploadFile" className="mb-0">
              <Form.Label className="mb-0">Upload File</Form.Label>
              <Form.Control type="file" multiple onChange={handleFileUpload} />
            </Form.Group>
          </div>

          <div className={styles.fileGrid}>
            {[...(initialData.files || []), ...uploadedFiles].map(
              (file, idx) => (
                <div key={idx} className={styles.fileBox}>
                  <div className={styles.fileInfo}>
                    <div className={styles.fileName}>
                      <a
                        href={file.url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.name}
                      </a>
                    </div>
                    <div className={styles.fileMeta}>
                      {file.type} • {file.size} • {file.date}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.statementActions}>
          <Button
            className={styles.btnCancel}
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className={styles.btnSave}
            variant="success"
            type="submit"
          >
            Save
          </Button>
          {onDelete && (
            <Button variant="danger" onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default StatementForm;