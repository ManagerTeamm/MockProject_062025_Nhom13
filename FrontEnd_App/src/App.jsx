import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import Investigation from "./pages/investigation";
import Evidence from "./pages/evidence";
import UserList from "./pages/admin/userList";
import ReportPage from "./pages/report";
import ReportSuspect from "./pages/reportSuspect"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/investigation" element={<Investigation />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/admin/userlist" element={<UserList /> } />
        <Route path="/report-manager" element={<ReportPage />} />
        <Route path="/report-suspect" element={<ReportSuspect />} />
      </Routes>
    </Router>
  );
}

export default App;
