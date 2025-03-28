import { useState } from "react";
import { FavouritesContext } from "./FavouritesContext";

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  }

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favourites, setFavourites] = useState<Dog[]>([]);
  
    // Function to add/remove favorites
    const toggleFavourite = (dog: Dog) => {
      setFavourites((prev) =>
        prev.some((fav) => fav.id === dog.id)
          ? prev.filter((fav) => fav.id !== dog.id)
          : [...prev, dog]
      );
    };
  
    return (
      <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
        {children}
      </FavouritesContext.Provider>
    );
  };