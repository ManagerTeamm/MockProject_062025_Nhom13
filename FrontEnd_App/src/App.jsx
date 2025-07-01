import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./pages/login";
import AuthenRoute from "./route/authenroute";
import AdminPage from "./pages/admin";
import InmateAdmissions from "./pages/inmateadmission";
import CaseFile from "./pages/casefile";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginComponent />} />

      <Route
        path="/admin"
        element={
          <AuthenRoute allowedRoles={["Admin"]}>
            <AdminPage />
          </AuthenRoute>
        }
      />
      <Route
        path="/inmateadmission"
        element={
          <AuthenRoute allowedRoles={["Patrol Officer"]}>
            <InmateAdmissions />
          </AuthenRoute>
        }
      />
      <Route
        path="/casefile"
        element={
          <AuthenRoute allowedRoles={["Investigator"]}>
            <CaseFile />
          </AuthenRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthenRoute allowedRoles={["Admin", "Patrol Officer", "Investigator"]}>
            <Home />
          </AuthenRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;