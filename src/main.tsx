import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/Auth/AuthProvider.tsx";
import { FavouritesProvider } from "./context/Favourites/FavouritesProvider.tsx";
import { StyledEngineProvider } from "@mui/material/styles";
import { HashRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <StyledEngineProvider injectFirst>
        <AuthProvider>
          <FavouritesProvider>
            <App />
          </FavouritesProvider>
        </AuthProvider>
      </StyledEngineProvider>
    </Router>
  </StrictMode>
);
