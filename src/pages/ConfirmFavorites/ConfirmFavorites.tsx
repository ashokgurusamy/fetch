import { Box, Divider, Typography } from "@mui/material";
import Dog from "../../components/Dog/Dog";
import { useContext } from "react";
import { FavouritesContext } from "../../context/Favourites/FavouritesContext";

export const ConfirmFavourties = () => {
  const { favourites } = useContext(FavouritesContext);
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
          Confirm your favorites
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
          {favourites.map((dog) => (
            <Dog dog={dog} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
