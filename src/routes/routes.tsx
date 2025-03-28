import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoutes";
import { Search } from "../pages/Search/Search";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route
      path="/search"
      element={
        <ProtectedRoute>
          <Search />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
