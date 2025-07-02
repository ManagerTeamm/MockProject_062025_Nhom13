import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const decoded = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  }, [token]);

  const role = useMemo(() => {
    if (!decoded) return null;

    return (
      decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] ||
      decoded["role"] ||
      decoded["roles"] ||
      null
    );
  }, [decoded]);

  useEffect(() => {
    setLoading(false);
  }, [decoded]);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const contextValue = useMemo(
    () => ({
      token,
      role,
      login,
      logout,
      loading,
    }),
    [token, role, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

