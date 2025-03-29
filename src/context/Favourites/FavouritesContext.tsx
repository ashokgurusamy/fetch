import { createContext } from "react";
import { Dog } from "../../types/types";

interface FavouritesContextType {
  favourites: Dog[];
  toggleFavourite: (dog: Dog) => void;
  resetFav: () => void
}

export const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  toggleFavourite: () => undefined,
  resetFav: () => undefined
});
