import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import ProfilePage from "./pages/profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCurrentUser, getUserProfile } from './service/accountservice';

// A PrivateRoute component to protect routes that require login
const PrivateRoute = ({ children }) => {
    const currentUser = getCurrentUser();
    // THÊM LOG ĐỂ KIỂM TRA TRẠNG THÁI ĐĂNG NHẬP
    console.log("PrivateRoute: currentUser check -", currentUser ? "Logged in" : "Not logged in");
    return currentUser ? children : <Navigate to="/" />;
};

const App = () => {
    const [userProfile, setUserProfile] = React.useState(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const user = getCurrentUser();
      // LOG ĐỂ KIỂM TRA USER TOKEN TỪ LOCALSTORAGE
      console.log("App.js useEffect: user from localStorage -", user);

      if (user && user.token) {
        try {
          const profile = await getUserProfile();
          // LOG ĐỂ KIỂM TRA PROFILE ĐÃ LẤY ĐƯỢC TỪ API
          console.log("App.js useEffect: Profile fetched successfully -", profile);
          setUserProfile(profile);
        } catch (error) {
          // LOG LỖI KHI TẢI PROFILE
          console.error("App.js useEffect: Error loading user profile:", error.message);
          localStorage.removeItem("account"); // Xóa token nếu có lỗi
          // Tùy chọn: navigate("/"); // Bạn có thể thêm điều hướng ở đây nếu muốn người dùng về trang đăng nhập khi token lỗi
        }
      } else {
        console.log("App.js useEffect: No user or token found, skipping profile fetch.");
      }
    };
    fetchProfile();
  }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component mount

  // LOG ĐỂ KIỂM TRA userProfile STATE HIỆN TẠI TRONG APP.JS
  console.log("App.js render: Current userProfile state -", userProfile);


  return (
    <Router>
      <Routes>
               <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              {/* Truyền userProfile xuống Home component */}
              {/* LOG TRƯỚC KHI TRUYỀN PROPS XUỐNG HOME */}
              <Home userProfile={userProfile} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;