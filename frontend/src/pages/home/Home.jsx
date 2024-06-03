import React from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";

import Faviorate from "./faviorate/faviorate";

const Home = () => {
    return (
        <div className="homePage">
            <HeroBanner />
            <Faviorate />
            <Trending />
            <Popular />
           
        </div>
    );
};

export default Home;
