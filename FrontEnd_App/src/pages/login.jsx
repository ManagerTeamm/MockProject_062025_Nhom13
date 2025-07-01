import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import "../css/login.css";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="login-background">
      <div className="login-card">
        <div className="login-form">
          <h1 className="login-title">PD SYSTEM</h1>

          <Form>
            <Form.Group controlId="formEmail" className="form-section">
              <Form.Label>Email or Username</Form.Label>
              <Form.Control type="email" placeholder="Enter email" className="login-input" />
            </Form.Group>

            <Form.Group controlId="formPassword" className="form-section">
              <div className="d-flex justify-content-between align-items-center">
                <Form.Label>Password</Form.Label>
                <div className="password-toggle" onClick={togglePassword}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  <span className="toggle-text">{showPassword ? "Hide" : "Show"}</span>
                </div>
              </div>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="login-input"
              />
            </Form.Group>

            <div className="text-center mt-4">
              <Button className="login-btn">Login</Button>
            </div>
          </Form>
        </div>
        <div className="language-select mt-3">
          <Form.Select>
            <option>English (United States)</option>
            <option>Vietnamese</option>
            <option>French</option>
            <option>Japanese</option>
          </Form.Select>
        </div>
        <div className="login-footer mt-4">
          <div className="divider"></div>
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Help Center</a>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;

