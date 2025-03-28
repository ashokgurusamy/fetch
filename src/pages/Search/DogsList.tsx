import React, { useEffect, useState } from "react";
import { Search } from "./Search";
import Dog from "./Dog";
import { Box, CircularProgress } from "@mui/material";

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

    useEffect(()=>{
        handleSearch({breeds:[], ageMin:0, ageMax:35, sort:"breed:asc" })
    },[])

    const handleSearch = async (params: any) => {
        setLoading(true);
        try {
            const query = new URLSearchParams();

            params.breeds?? query.append("breeds", params.breeds);
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
            <Search handleSearch= {handleSearch} />

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
                        gap: 2,
                        mt: 3,
                    }}
                >
                    {dogs.map((dog) => (
                        <Dog key={dog.id} dog={dog} isFavorite={false} onFavoriteChange={() => { }} />
                    ))}
                </Box>
            )}
        </Box>
    )

}