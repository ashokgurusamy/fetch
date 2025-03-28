import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { login, logout } from "../../api/api";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.includes("fetch-access-token");
    setIsAuthenticated(token);
  }, []);

  const handleLogin = async (name: string, email: string) => {
    const response = await login(name, email);
    if (response) {
      setIsAuthenticated(true);
      navigate("/search");
      return;
    }
    alert("Login failed. Please try again.");
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
      value={{ isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
