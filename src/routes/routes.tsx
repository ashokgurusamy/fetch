import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from "./ProtectedRoutes";
import { SearchProvider } from "../context/Search/SearchProvider";
import Main from "../pages/Main/Main";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route
      path="/home"
      element={
        <ProtectedRoute>
          <SearchProvider>
            <Main />
          </SearchProvider>
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
