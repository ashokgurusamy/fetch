import { createContext } from "react";

// Define context type
interface AuthContextType {
  isAuthenticated: boolean;
  handleLogin: (name: string, email: string) => Promise<boolean>;
  handleLogout: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  handleLogin: async () => false,
  handleLogout: async () => false,
});
