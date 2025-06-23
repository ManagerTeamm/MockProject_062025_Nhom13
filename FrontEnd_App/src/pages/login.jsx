import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginAccount } from "../service/accountservice";
const images = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
];

const LoginPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const account = await loginAccount(email, password);
      console.log("Login success:", account);

      localStorage.setItem("account", JSON.stringify(account));

      navigate("/home");
    } catch (err) {
      console.error(err.message);
      alert("Login failed: " + err.message);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center bg-light">
      <Row className="flex-grow-1">
        <Col
          md={6}
          className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5"
          style={{
            backgroundImage: `url(${images[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 1s ease-in-out",
          }}
        >
          <h1 className="fw-bold display-5 mb-3">Demo Login</h1>
          <p className="lead opacity-75 text-center w-75">
            Criminal Investigation
          </p>
        </Col>

        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center p-4 p-md-5"
        >
          <div style={{ maxWidth: 420, width: "100%" }}>
            <h2 className="fw-bold mb-2">Welcome back 👋</h2>
            <p className="text-muted mb-4">
              Sign in to your account to continue
            </p>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="fw-medium">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="nhan@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label className="fw-medium">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-100 fw-semibold"
              >
                Sign in
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
