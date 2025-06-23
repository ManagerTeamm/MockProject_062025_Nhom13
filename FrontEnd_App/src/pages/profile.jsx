import React, { useState, useEffect } from "react";  
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { profileService } from "../service/profileService";


const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);
  
  const handleLogout = () => {
    localStorage.removeItem("account");
    window.location.href = "/";
  };

  // Lấy account 1 lần và cache trong state
  const getAccount = () => {
    const accountData = localStorage.getItem("account");
    return accountData ? JSON.parse(accountData) : null;
  };
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!account || !account.token) {
        setError("Không tìm thấy token. Vui lòng đăng nhập lại.");
        return;
      }

      const response = await profileService.getProfile(account.token);
      
      if (response.success) {
        setProfileData(response.data);
      } else {
        setError(response.message || "Không thể tải thông tin profile");
      }
    } catch (err) {
      setError("Có lỗi xảy ra khi tải thông tin profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };  
  
  useEffect(() => {
    // Lấy account 1 lần khi component mount
    const accountData = getAccount();
    setAccount(accountData);
    
    if (accountData) {
      fetchProfile();
    } else {
      setLoading(false);
      setError("Vui lòng đăng nhập để xem thông tin profile.");
    }

  }, []);

  // Effect riêng để fetch profile khi account thay đổi
  useEffect(() => {
    if (account && account.token) {
      fetchProfile();
    }
  }, [account]);

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center bg-light">
      <Row className="flex-grow-1">
        <Col className="d-flex flex-column justify-content-center align-items-center text-dark p-5">
          <h1 className="fw-bold display-5 mb-3">Profile</h1>
          
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </Spinner>
              <p className="mt-2">Đang tải thông tin profile...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
              {account && (
                <Button variant="outline-primary" onClick={fetchProfile} className="me-2">
                  Thử lại
                </Button>
              )}
              {!account && (
                <Button variant="primary" onClick={() => window.location.href = "/login"}>
                  Đăng nhập
                </Button>
              )}
            </div>          ) : profileData ? (
            <div className="text-center">
              <div className="mb-4">
                <h3>Thông tin cá nhân</h3>
              </div>
              <div className="profile-info text-start">
                {profileData && (
                  <p><strong>Tên người dùng:</strong> {profileData}</p>
                )}
            
              </div>
              <div className="mt-4">
                <Button variant="primary" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Alert variant="warning">
                Không có dữ liệu profile để hiển thị.
              </Alert>
              <Button variant="primary" onClick={fetchProfile}>
                Tải lại
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;