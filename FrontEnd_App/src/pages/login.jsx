import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/authenservice";
import { saveToken } from "../service/tokenservice";
import "../css/login.css";
import { jwtDecode } from "jwt-decode";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await login(email, password);
      saveToken(token);
      
      const decoded = jwtDecode(token);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      switch (role) { //sửa lại chỗ này nhé
        case "Admin":
          console.log("Navigating to /admin");
          navigate("/admin");
          break;
        case "Patrol Officer":
          console.log("Navigating to /abc");
          navigate("/inmateadmission");
          break;
        case "Investigator":
          console.log("Navigating to /123");
          navigate("/casefile");
          break;
        default:
          console.log("Navigating to /hithere");
          navigate("/home");
      }
    } catch (error) {
      alert("Login failed: " + (error.response?.data || "Server error"));
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <div className="login-form">
          <h1 className="login-title">PD SYSTEM</h1>

          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail" className="form-section">
              <Form.Label>Email or Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="text-center mt-4">
              <Button className="login-btn" type="submit">
                Login
              </Button>
            </div>
          </Form>
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
    </div>
  );
};

export default LoginComponent;


