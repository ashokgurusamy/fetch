import { createContext } from "react";

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

  export const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);
