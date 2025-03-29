import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import Dog from "../../components/Dog/Dog";
import { useContext, useEffect, useState } from "react";
import { FavouritesContext } from "../../context/Favourites/FavouritesContext";
import { fetchMatchedDog } from "../../api/api";

export const GenerateMatch = () => {
  const { favourites } = useContext(FavouritesContext);
  const [matchedDog, setMatchedDog] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchMatchedDog(favourites.map((value) => value.id))
      .then((value) => setMatchedDog(value.match))
      .finally(() => setLoading(false));
  }, [favourites]);
  const yourDog = favourites.find((value) => value.id === matchedDog);
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
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Best match for you
        </Typography>
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
          {!loading &&
            yourDog &&
            favourites.find((value) => (value.id = matchedDog)) && (
              <Dog dog={yourDog} disableFavouriteButton={true} />
            )}
        </Box>
      </Box>
    </Box>
  );
};
