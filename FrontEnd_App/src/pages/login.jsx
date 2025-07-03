import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/authenservice";
import { saveToken } from "../utils/tokenservice";
import "../styles/login.css";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../provider/authenprovider";
import { roleMap } from "../model/rolemap";
import { getUserRoleFromToken } from "../utils/jwt";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login: loginToContext } = useAuth();
  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAccount(username, password);
      console.log("Login success:", data);

      saveCookie("token", data.token);
      const role = getUserRoleFromToken();
      
      role? navigate("/secure/home") : navigate("/login");
      
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <div className="login-form">
          <h1 className="login-title">PD SYSTEM</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formUsername" className="form-section">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
}

export default LoginComponent;


