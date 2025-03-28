import { FavouritesContext } from "../context/Favourites/FavouritesContext";
import { useContext } from "react";

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  }
  
  // Define context shape
  interface FavouritesContextType {
    favourites: Dog[];
    toggleFavourite: (dog: Dog) => void;
  }
  
export const useFavourites = (): FavouritesContextType => {
    const context = useContext(FavouritesContext);
    if (!context) {
      throw new Error("useFavourites must be used within a FavouritesProvider");
    }
    return context;
  };