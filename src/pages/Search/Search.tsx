import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Autocomplete,
  Slider,
  InputLabel,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Badge,
  MenuItem,
  Menu,
  CircularProgress,
} from "@mui/material";
import { SearchContext } from "../../context/Search/SearchContext";
import TuneIcon from "@mui/icons-material/Tune";
import { fetchZipsByCity } from "../../api/api";
import { Location } from "../../types/types";

export const Search = () => {
  const { searchInput, breeds, handleInputChange } = useContext(SearchContext);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<Location[]>(
    searchInput?.zipCodes || []
  );
  const [tempFilterState, setTempFilterState] = useState(searchInput);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const resetEverything = () => {
    setTempFilterState({
      ...searchInput,
      breeds: [],
      ageMin: 0,
      ageMax: 25,
      from: "0",
    });
    setSelectedLocations([]);
  };

  const [open, setOpen] = useState(false);

  const filtersApplied = useMemo(() => {
    console.log("Search input", searchInput, tempFilterState);
    return (
      ((searchInput.breeds ||
        searchInput.ageMax ||
        searchInput.ageMin ||
        searchInput.from ||
        searchInput.zipCodes) &&
        ((searchInput.breeds && searchInput.breeds?.length > 0) ||
          searchInput.ageMax !== 25 ||
          searchInput.ageMin !== 0 ||
          searchInput.from !== "0")) ||
      (searchInput.zipCodes && searchInput.zipCodes?.length > 0)
    );
  }, [searchInput]);

  const handleCancel = () => {
    setOpen(false);
    setTempFilterState(searchInput);
    setSelectedLocations(searchInput.zipCodes || []);
  };

  const applyFilters = () => {
    setOpen(false);
    handleInputChange({
      ...searchInput,
      ...tempFilterState,
      zipCodes: selectedLocations,
    });
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const sortMenu = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      if (inputValue.length < 2) return;

      setLoading(true);
      try {
        const response = await fetchZipsByCity(inputValue);
        setLocations(response);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (inputValue) fetchBreeds();
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const sortOptions: Record<string, string> = {
    "breed:asc": "Breed: A->Z",
    "breed:desc": "Breed: Z->A",
    "age:asc": "Age: Low to High",
    "age:desc": "Age: High to Low",
    "name:asc": "Name: A->Z",
    "name:desc": "Name: Z->A",
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleCancel}
        sx={{
          "& .MuiPaper-root": {
            minWidth: 320,
            maxWidth: "640",
            minHeight: 400,
            maxHeight: "100dvh",
            overflowY: "auto",
          },
        }}
      >
        <DialogTitle>Apply Filters</DialogTitle>
        <DialogContent>
          <Box display={"flex"} flexDirection={"column"} gap={2} p={2}>
            <Autocomplete
              multiple
              disableCloseOnSelect
              options={breeds}
              value={tempFilterState?.breeds || []}
              onChange={(_, newValue) =>
                setTempFilterState({ ...tempFilterState, breeds: newValue })
              }
              renderInput={(params) => (
                <TextField {...params} label="Select Breeds" />
              )}
            />
            <Autocomplete
              multiple
              disableCloseOnSelect
              options={locations}
              loading={loading}
              value={selectedLocations || []}
              getOptionLabel={(option) => `${option.zip_code} - ${option.city}`}
              noOptionsText={
                inputValue.length > 1
                  ? "No location found"
                  : "Type to search by location"
              }
              onChange={(_, newValue) => setSelectedLocations(newValue)}
              onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Location"
                  placeholder="Type to search..."
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    },
                  }}
                />
              )}
            />
            <Box sx={{ px: 2 }}>
              <InputLabel>Age Range</InputLabel>
              <Slider
                value={[
                  tempFilterState?.ageMin || 0,
                  tempFilterState?.ageMax || 25,
                ]}
                onChange={(_, newValue) =>
                  setTempFilterState({
                    ...tempFilterState,
                    ageMax: newValue[1],
                    ageMin: newValue[0],
                  })
                }
                valueLabelDisplay="auto"
                min={0}
                max={20}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={resetEverything}>
            Reset
          </Button>
          <Button variant="contained" color="primary" onClick={applyFilters}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      <Box display={"flex"} gap={1} sx={{ my: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          startIcon={
            filtersApplied ? (
              <Badge color="primary" badgeContent={" "}>
                <TuneIcon />
              </Badge>
            ) : (
              <TuneIcon />
            )
          }
        >
          Filters
        </Button>
        <Button
          variant="outlined"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Sort by: {searchInput.sort && sortOptions[searchInput.sort]}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={sortMenu}
          onClose={handleClose}
        >
          {Object.keys(sortOptions).map((sortOption) => (
            <MenuItem
              key={sortOption}
              onClick={() => {
                handleInputChange({ ...searchInput, sort: sortOption });
                handleClose();
              }}
            >
              {sortOptions[sortOption]}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};
