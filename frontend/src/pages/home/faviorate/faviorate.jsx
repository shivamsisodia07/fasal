import React, { useState,useEffect } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import axios from "axios";
const Faviorate = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            try {
                const response = await axios.get('http://localhost:5000/api/faviorateMovie/get', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setMovies(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching favorite movies:', error.response ? error.response.data : error.message);
                setError(error.response ? error.response.data : error.message);
                setLoading(false);
            }
        };

        fetchFavoriteMovies();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

console.log(movies)
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Faviorate List</span>
            </ContentWrapper>
            <Carousel
                data={movies}
                loading={loading}
                endpoint={endpoint}
            />
           
        </div>
    );
};

export default Faviorate;
