import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Autocomplete,
  Slider,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

interface SearchParams {
  breeds: string[];
  ageMin?: number;
  ageMax?: number;
  sort?: string;
}

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const Search = (props: any) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState<number[]>([0, 35]);
  const [sortBy, setSortBy] = useState<string>("breed:asc");

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/dogs/breeds`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setBreeds(data);
        }
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const searchParams: SearchParams = {
      breeds: selectedBreeds,
      ageMin: ageRange[0],
      ageMax: ageRange[1],
      sort: sortBy,
    };
    console.log(props.handleSearch)
    props.handleSearch(searchParams);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 500,
        mx: "auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      {/* Breed Selection */}
      <Autocomplete
        multiple
        options={breeds}
        value={selectedBreeds}
        onChange={(_, newValue) => setSelectedBreeds(newValue)}
        renderInput={(params) => <TextField {...params} label="Select Breeds" />}
      />

      {/* Age Range Slider */}
      <Box sx={{ px: 2 }}>
        <InputLabel>Age Range</InputLabel>
        <Slider
          value={ageRange}
          onChange={(_, newValue) => setAgeRange(newValue as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={20}
        />
      </Box>

      {/* Search Button */}
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};
