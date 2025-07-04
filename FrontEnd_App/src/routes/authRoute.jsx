import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRoleFromToken } from "../utils/jwt";

const AuthenRoute = ({ allowedRoles, children }) => {
    const role = getUserRoleFromToken();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AuthenRoute;