import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import Investigation from "./pages/investigation";
import Evidence from "./pages/evidence";
import UserList from "./pages/admin/userList";
import ReportPage from "./pages/report";
import ReportSuspect from "./pages/reportSuspect"
import Suspect from "./pages/suspect";
import ReportDetail from "./pages/reportDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/investigation" element={<Investigation />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/suspect" element={<Suspect />} />
        <Route path="/admin/userlist" element={<UserList /> } />
        <Route path="/report-manager" element={<ReportPage />} />
        <Route path="/report-suspect" element={<ReportSuspect />} />
          <Route path="/report-detail" element={<ReportDetail />} />
      </Routes>
    </Router>
  );
}

export default App;