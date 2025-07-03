import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { getUserRoleFromToken } from "../utils/jwt";
import { getCookie } from "../utils/cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  const role = useMemo(() => {

      const rawRole = getUserRoleFromToken("token");

  return rawRole || "Unknown";
  },);

  useEffect(() => {
    const rawToken = getCookie("token");
    setLoading(false);
    setToken(rawToken || null);
  },);

  const contextValue = useMemo(
    () => ({
      token,
      role,
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

