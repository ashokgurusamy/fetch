import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.includes("fetch-access-token");
    setIsAuthenticated(token);
  }, []);

  const login = async (name: string, email: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `${import.meta.env.API_BASE_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ name, email }),
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      return true;
    } catch (error) {
      console.error("Error while logging in", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.API_BASE_URL}/auth/logout`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      return true;
    } catch (error) {
      console.error("Error while logging out", error);
      return false;
    }
  };

  const handleLogin = async (name: string, email: string) => {
    const response = await login(name, email);
    if (!response) {
      setIsAuthenticated(true);
      navigate("/search");
      return;
    }
    alert("Login failed. Please try again.");
  };

  const handleLogout = async () => {
    const response = await logout();
    if (!response) {
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
