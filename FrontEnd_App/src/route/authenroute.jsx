import React from "react";
import { Navigate } from "react-router-dom";
import { getRoleFromToken } from "../service/tokenservice";

const AuthenRoute = ({ allowedRoles, children }) => {
  const role = getRoleFromToken();

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthenRoute;