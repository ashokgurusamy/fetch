import { useState } from "react";
import { FavouritesContext } from "./FavouritesContext";
import { Dog } from "../../types/types";

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Dog[]>([]);

  const toggleFavourite = (dog: Dog) => {
    setFavourites((prev) =>
      prev.some((fav) => fav.id === dog.id)
        ? prev.filter((fav) => fav.id !== dog.id)
        : [...prev, dog]
    );
  };

  console.log("Favouriotes", favourites);

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};
