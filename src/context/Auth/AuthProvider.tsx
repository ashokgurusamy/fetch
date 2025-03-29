import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { login, logout } from "../../api/api";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.includes("fetch-access-token");
    setIsAuthenticated(token);
  }, []);

  const handleLogin = async (name: string, email: string) => {
    setLoading(true);
    const response = await login(name, email);
    if (response) {
      setIsAuthenticated(true);
      navigate("/home");
      setLoading(false);
      return;
    }
    alert("Login failed. Please try again.");
    setLoading(false);
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      setIsAuthenticated(false);
      navigate("/");
      return;
    }
    alert("Logout failed. Please try again.");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
