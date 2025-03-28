import { useState } from "react";
import { Search } from "./Search";
import Dog from "./Dog";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import { SearchContext } from "../../context/Search/SearchContext";

export const DogsList = () => {
  const [isMatch, toggleMatchAndFav] = useState(false);
  const { dogResults, loading } = useContext(SearchContext);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          gap: "5em",
          margin: "0 7.5em",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            minWidth: "15em",
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "white",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            "&:hover": { cursor: "pointer" },
            alignItems: "center",
          }}
          onClick={() => {
            toggleMatchAndFav(true);
          }}
        >
          <FavoriteIcon sx={{ color: "red" }} />
          <Typography variant="h6">
            {" "}
            {isMatch ? "Match" : "My Favourites"}
          </Typography>
        </Box>
        <Search />
      </Box>

      <Divider sx={{ margin: "2em 6em" }} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            mt: 3,
          }}
        >
          {dogResults.map((dog) => (
            <Dog dog={dog} />
          ))}
        </Box>
      )}
    </Box>
  );
};
