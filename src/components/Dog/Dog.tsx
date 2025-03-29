import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { FavouritesContext } from "../../context/Favourites/FavouritesContext";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogCardProps {
  dog: Dog;
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
  const { favourites, toggleFavourite } = useContext(FavouritesContext);
  const isFavorite = favourites.some((favDog) => favDog.id === dog.id);

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 300,
        borderRadius: 2,
        boxShadow: 3,
        position: "relative",
      }}
    >
      {/* Dog Image */}
      <CardMedia
        component="img"
        height="180"
        image={dog.img}
        alt={dog.name}
        sx={{ borderRadius: "8px 8px 0 0" }}
      />

      {/* Dog Details */}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {dog.name}
        </Typography>
        <Box>
          <Typography variant="body2" color="textSecondary">
            <strong>Breed:</strong> {dog.breed}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Age:</strong> {dog.age} years
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Zip Code:</strong> {dog.zip_code}
          </Typography>

          <IconButton
            onClick={() => toggleFavourite(dog)}
            color={isFavorite ? "error" : "default"}
            sx={{
              position: "absolute",
              bottom: 10,
              right: 10,
              color: isFavorite ? "red" : "gray",
              outline: "none !important",
              "&:focus &:focus-visible": { outline: "none" },
            }}
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DogCard;
