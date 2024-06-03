import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Login from "./components/login/login";
import Signup from "./components/signUp/signUp";


function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { url } = useSelector((state) => state.home);
    console.log(url);

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            console.log(res);

            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };

            dispatch(getApiConfiguration(url));
        });
    };

    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        console.log(data);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };

    return (
        <BrowserRouter>
            <Header />
            <div>
            <Routes>
            
               {isAuthenticated && <Route path="/" element={<Home/>} />} 
               {isAuthenticated && <Route path="/:mediaType/:id" element={<Details />} />} 
               {isAuthenticated && <Route path="/explore/:mediaType" element={<Explore />} />}
               {isAuthenticated && <Route path="/search/:query" element={<SearchResult />} />}
               {!isAuthenticated && <Route path="/" element={<Login />} />}
               {!isAuthenticated && <Route path="/signup" element={<Signup />} />}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
