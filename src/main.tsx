import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth/AuthProvider.tsx";
import { FavouritesProvider } from "./context/Favourites/FavouritesProvider.tsx";
import { StyledEngineProvider } from "@mui/material/styles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <AuthProvider>
          <FavouritesProvider>
            <App />
          </FavouritesProvider>
        </AuthProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </StrictMode>
);
