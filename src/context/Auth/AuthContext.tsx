import { createContext } from "react";

// Define context type
interface AuthContextType {
  isAuthenticated: boolean;
  handleLogin: (name: string, email: string) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  handleLogin: async () => undefined,
  handleLogout: async () => undefined,
});
