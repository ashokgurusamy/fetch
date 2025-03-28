import { useEffect, useState } from "react";
import { Search } from "./Search";
import Dog from "./Dog";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavourites } from "../../hooks/useFavourites";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

export const DogsList = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(false);
    const { favourites } = useFavourites();
    const [isMatch, toggleMatchAndFav] = useState(false)

    useEffect(() => {
        handleSearch({ breeds: [], ageMin: 0, ageMax: 35, sort: "breed:asc" })
    }, [])

    const handleSearch = async (params: any) => {
        setLoading(true);
        try {
            const query = new URLSearchParams();

            params.breeds ?? query.append("breeds", params.breeds);
            query.append("ageMin", params.ageMin.toString());
            query.append("ageMax", params.ageMax.toString());
            query.append("sort", params.sort);

            const response = await fetch(`${API_BASE_URL}/dogs/search?${query.toString()}`, {
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                const dogDetailsResponse = await fetch(`${API_BASE_URL}/dogs`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data.resultIds),
                });

                if (dogDetailsResponse.ok) {
                    const dogsData = await dogDetailsResponse.json();
                    setDogs(dogsData);
                    toggleMatchAndFav(false)
                }
            }
        } catch (error) {
            console.error("Error fetching dogs:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{
                    display: "flex",
                        gap: "5em",
                        margin: "0 7.5em",
                        flexWrap: "wrap",
                        justifyContent: "center",
            }}>
            <Box sx={{
                flexDirection: "column", 
                minWidth: "15em", 
                p: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "white",
                display: "flex", 
                flexWrap: "wrap", 
                justifyContent: "center", 
                '&:hover': {cursor: 'pointer'},
                alignItems: "center"
            }}
            onClick={()=>{
                setDogs(favourites)
                toggleMatchAndFav(true)
            }}
            >
                <FavoriteIcon sx={{ color: "red" }} />
                <Typography variant="h6"> {isMatch ? "Match" : "My Favourites"}</Typography>
            </Box>
            <Search handleSearch={handleSearch} />
            
            </Box>

            <Divider sx={{margin: "2em 6em"}}/>


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
                    {dogs.map((dog) => (
                        <Dog key={dog.id} dog={dog} />
                    ))}
                </Box>
            )}
        </Box>
    )

}