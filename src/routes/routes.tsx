import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoutes";
import { DogsList } from "../pages/Search/DogsList";
import { SearchProvider } from "../context/Search/SearchProvider";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route
      path="/search"
      element={
        <ProtectedRoute>
          <SearchProvider>
            <DogsList />
          </SearchProvider>
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
