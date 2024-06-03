import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const CircleRating = ({ rating }) => {

    const faviorateHander = () => {
        console.log("faviorateHander");
    };
    return (
        <div className="circleRating" onClick={faviorateHander}>
           <div className="faviorate">❤️</div>
        </div>
    );
};

export default CircleRating;
