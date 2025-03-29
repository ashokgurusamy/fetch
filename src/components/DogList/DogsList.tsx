import { Search } from "../../pages/Search/Search";
import Dog from "../Dog/Dog";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Pagination,
  Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { SearchContext } from "../../context/Search/SearchContext";
import { FavouritesContext } from "../../context/Favourites/FavouritesContext";
import { AuthContext } from "../../context/Auth/AuthContext";

export const DogsList = () => {
  const { dogResults, loading, totalPages, handleInputChange, searchInput } =
    useContext(SearchContext);
  const { resetFav } = useContext(FavouritesContext);
  const { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    resetFav();
  }, []);

  return (
    <Box
      sx={{
        p: 3,
        pb: 0,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box>
        <Box display={"flex"}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Choose your favourites
          </Typography>
          <Button variant="text" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <Search />
        <Divider sx={{ my: 2 }} />
      </Box>
      <Box flex={1} overflow={"auto"}>
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!loading && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
              my: 3,
            }}
          >
            {dogResults.map((dog) => (
              <Dog dog={dog} />
            ))}
          </Box>
        )}
        {!loading && dogResults.length == 0 && (
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            No dogs found. Please try different filters.
          </Typography>
        )}
      </Box>
      <Pagination
        count={totalPages}
        sx={{ padding: 2, "& .MuiPagination-ul": { justifyContent: "center" } }}
        disabled={totalPages === 0}
        onChange={(_e, page) => {
          handleInputChange({ ...searchInput, from: `${page}` });
        }}
        variant="outlined"
      />
    </Box>
  );
};
