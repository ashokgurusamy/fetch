import { createContext } from "react";
interface AuthContextType {
  isAuthenticated: boolean;
  handleLogin: (name: string, email: string) => void;
  handleLogout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  handleLogin: async () => undefined,
  handleLogout: async () => undefined,
  loading: false,
});
