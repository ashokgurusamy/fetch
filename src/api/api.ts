import { Dog, SearchInput, SearchResponse } from "../types/types";

export const login = async (name: string, email: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({ name, email }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Login failed");
    }
    return true;
  } catch (error) {
    console.error("Error while logging in", error);
    return false;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Logout failed");
    }
    return true;
  } catch (error) {
    console.error("Error while logging out", error);
    return false;
  }
};

export const fetchBreeds = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/dogs/breeds`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching breeds:", error);
    return [];
  }
};

export const fetchDogIdsBasedOnFilters = async (
  value: SearchInput
): Promise<SearchResponse | null> => {
  try {
    const query = new URLSearchParams();
    if (value.breeds) {
      query.append("breed", value.breeds.toString());
    }
    if (value.zipCodes) {
      query.append("zipCode", value.zipCodes.toString());
    }
    if (value.ageMin) {
      query.append("ageMin", value.ageMin.toString());
    }
    if (value.ageMax) {
      query.append("ageMax", value.ageMax.toString());
    }
    if (value.size) {
      query.append("ageMax", value.size.toString());
    }
    if (value.from) {
      query.append("ageMax", value.from.toString());
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/dogs/search?${query.toString()}`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dogs:", error);
    return null;
  }
};

export const fetchDogDetails = async (dogIds: string[]): Promise<Dog[]> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/dogs`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(dogIds),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching dog details:", error);
    return [];
  }
};
