import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { login, logout } from "../../api/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.includes("fetch-access-token");
    setIsAuthenticated(token);
  }, []);

  const handleLogin = async (name: string, email: string) => {
    try {
      await login(name, email);
      setIsAuthenticated(true);
      navigate("/search");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
