import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoutes";
import { Search } from "../pages/Search/Search";
import { DogsList } from "../pages/Search/DogsList";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route
      path="/search"
      element={
        <ProtectedRoute>
          <DogsList />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
