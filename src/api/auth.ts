import axios from "axios";

const API_BASE = "https://frontend-take-home-service.fetch.com";

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const login = async (name: string, email: string): Promise<void> => {
  await api.post("/auth/login", { name, email });
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};
