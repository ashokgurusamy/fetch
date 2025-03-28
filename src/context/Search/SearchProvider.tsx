import { useEffect, useRef, useState } from "react";
import { SearchContext } from "./SearchContext";
import { Dog, SearchInput } from "../../types/types";
import {
  fetchBreeds,
  fetchDogDetails,
  fetchDogIdsBasedOnFilters,
} from "../../api/api";

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchInput, setSearchInput] = useState<SearchInput>({});
  const [loading, setLoading] = useState(true);
  const dogsCache = useRef<Record<string, Dog>>({});
  const [breeds, setBreeds] = useState<string[]>([]);
  const [dogResults, setDogResults] = useState<Dog[]>([]);
  const handleInputChange = (input: SearchInput) => {
    setSearchInput(input);
  };

  const handleSearch = async () => {
    setLoading(true);
    const result = await fetchDogIdsBasedOnFilters(searchInput);
    if (!result) {
      console.error("No results found");
      setLoading(false);
      return;
    }
    const idsNotInCache = result.resultIds.filter(
      (id) => !dogsCache.current[id]
    );
    const newDogs: Dog[] = await fetchDogDetails(idsNotInCache);
    newDogs.forEach((dog) => {
      dogsCache.current[dog.id] = dog;
    });
    setDogResults(result.resultIds.map((id) => dogsCache.current[id]));
    setLoading(false);
  };
  useEffect(() => {
    fetchBreeds().then((value) => setBreeds(value));
    handleSearch();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        handleInputChange,
        breeds,
        dogResults,
        handleSearch,
        loading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
