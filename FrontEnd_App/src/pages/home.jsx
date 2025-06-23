import React, { useState, useEffect } from 'react';
import { useNavigate,  } from 'react-router-dom'; // Import useNavigate
import { getCurrentUser, getUserProfile } from '../service/accountservice'
const Home = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [userprofile, setUserprofile] = useState(null);
  const [error, setError] = useState(null);
  const handleLogout = () => {
    localStorage.removeItem("account"); // Xóa token
    navigate("/"); // Điều hướng về trang đăng nhập
  };
  const fetchProfile = async () => {
        try {

            const response = await getUserProfile();
            console.log("aaa", response);
            setUserprofile(response);
    
        } catch (err) {
            setError("Có lỗi xảy ra khi tải thông tin profile: " + err.message);
        } finally {

        }
    }; 

  useEffect(() => {
      fetchProfile() ;
  
    }, []);
  return (
    <div className="text-center p-5">
      <h1>Welcome to the Home Page!</h1>
      <p>You have successfully logged in.</p>

      {/* Nút Logout */}
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>

      {/* Hiển thị thông tin người dùng nếu có */}
      {userprofile ? (
        <div className="mt-4">
          <h3>Your Profile:</h3>
                  <p><strong>ID:</strong> {userprofile.id}</p>
                  <p><strong>Username:</strong> {userprofile.username}</p>
                  <p><strong>Email:</strong> {userprofile.email}</p>
          {/* Bạn có thể thêm các trường khác ở đây */}
        </div>
      ) : (
        <p className="text-muted">Loading user profile...</p>
      )}
    </div>
  );
};

export default Home;