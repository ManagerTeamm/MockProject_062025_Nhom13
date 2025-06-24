import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import ProfilePage from "./pages/profile";
import CaseFile from "./pages/casefile";
import InmateAdmissions from "./pages/inmateadmission";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
         <Route path="/profile" element={<ProfilePage />} />
         <Route path="/casefile" element={<CaseFile/>} />
         <Route path="/inmateadmission" element={<InmateAdmissions/>} />
      </Routes>
    </Router>
  );
}

export default App;
