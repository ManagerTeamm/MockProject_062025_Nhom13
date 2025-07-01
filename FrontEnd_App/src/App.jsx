import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import ReportPage from "./pages/report";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/report-manager" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
