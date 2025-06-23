import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = ({ userProfile }) => {
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const handleLogout = () => {
    localStorage.removeItem("account"); // Xóa token
    navigate("/"); // Điều hướng về trang đăng nhập
  };

  return (
    <div className="text-center p-5">
      <h1>Welcome to the Home Page!</h1>
      <p>You have successfully logged in.</p>

      {/* Nút Logout */}
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>

      {/* Hiển thị thông tin người dùng nếu có */}
      {userProfile ? (
        <div className="mt-4">
          <h3>Your Profile:</h3>
          <p><strong>ID:</strong> {userProfile.id}</p>
          <p><strong>Username:</strong> {userProfile.username}</p>
          <p><strong>Email:</strong> {userProfile.email}</p>
          {/* Bạn có thể thêm các trường khác ở đây */}
        </div>
      ) : (
        <p className="text-muted">Loading user profile...</p>
      )}
    </div>
  );
};

export default Home;