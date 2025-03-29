import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import DogCompoent from "../../components/Dog/Dog";
import { useContext, useEffect, useState } from "react";
import { FavouritesContext } from "../../context/Favourites/FavouritesContext";
import { fetchMatchedDog } from "../../api/api";
import { Dog } from "../../types/types";
import { AuthContext } from "../../context/Auth/AuthContext";

export const GenerateMatch = () => {
  const { favourites } = useContext(FavouritesContext);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(false);
  const { handleLogout } = useContext(AuthContext);
  useEffect(() => {
    fetchMatchedDog(favourites.map((value) => value.id))
      .then((matchedResult) =>
        setMatchedDog(
          favourites.find((value) => value.id === matchedResult.match) || null
        )
      )
      .finally(() => setLoading(false));
  }, [favourites]);
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
            Best match for you
          </Typography>
          <Button variant="text" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
      </Box>
      <Box flex={1} overflow={"auto"}>
        {favourites.length === 0 && (
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            No favourites selected. Please go back to select.
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            mt: 3,
          }}
        >
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
          {!loading && matchedDog && (
            <DogCompoent dog={matchedDog} disableFavouriteButton={true} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
