import React, { useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Autocomplete,
  Slider,
  InputLabel,
} from "@mui/material";
import { SearchContext } from "../../context/Search/SearchContext";

export const Search = () => {
  const { searchInput, breeds, handleInputChange, handleSearch } =
    useContext(SearchContext);

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minWidth: "20em",
        mx: "auto",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      {/* Breed Selection */}
      <Autocomplete
        multiple
        options={breeds}
        value={searchInput?.breeds || []}
        onChange={(_, newValue) =>
          handleInputChange({ ...searchInput, breeds: newValue })
        }
        renderInput={(params) => (
          <TextField {...params} label="Select Breeds" />
        )}
      />

      {/* Age Range Slider */}
      <Box sx={{ px: 2 }}>
        <InputLabel>Age Range</InputLabel>
        <Slider
          value={[searchInput?.ageMin || 0, searchInput?.ageMax || 25]}
          onChange={(_, newValue) =>
            handleInputChange({
              ...searchInput,
              ageMax: newValue[1],
              ageMin: newValue[0],
            })
          }
          valueLabelDisplay="auto"
          min={0}
          max={20}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </Box>
  );
};
