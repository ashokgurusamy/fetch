import { createContext } from "react";
import { Dog, SearchInput } from "../../types/types";

interface SearchContextType {
  searchInput: SearchInput;
  handleInputChange: (input: SearchInput) => void;
  breeds: string[];
  handleSearch: () => Promise<void>;
  dogResults: Dog[];
  loading: boolean;
  isLastPage: boolean;
  isFirstPage: boolean;
  totalPages: number;
}

export const SearchContext = createContext<SearchContextType>({
  searchInput: {},
  handleInputChange: async () => undefined,
  breeds: [],
  handleSearch: async () => undefined,
  dogResults: [],
  loading: true,
  isLastPage: false,
  isFirstPage: true,
  totalPages: 0
});
