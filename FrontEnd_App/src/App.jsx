import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import ProfilePage from "./pages/profile";
import CrimeManagementPage from './pages/CrimeManagementPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
         <Route path="/profile" element={<ProfilePage />} />
         <Route path="/CrimeManagementPage" element={<CrimeManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
