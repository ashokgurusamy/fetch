import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth/AuthProvider.tsx";
import { FavouritesProvider } from "./context/Favourites/FavouritesProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavouritesProvider>
        <App />
        </FavouritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
