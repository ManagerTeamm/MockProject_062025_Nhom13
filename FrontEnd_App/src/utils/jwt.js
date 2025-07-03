import { jwtDecode } from "jwt-decode";

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getRoleFromToken = () => {
  try {
    const token = getToken();
    if (!token) return null;
    const decoded = jwtDecode(token);
    return (
      decoded?.role ||
      null
    );
  } catch (e) {
    console.error("JWT decode failed:", e);
    return null;
  }
};

export const clearToken = () => {
  localStorage.removeItem("token");
};