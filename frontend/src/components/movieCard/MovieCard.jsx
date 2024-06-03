import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import axios from "axios";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  const addFavoriteMovie = async () => {
    console.log("clicked")
    const token =localStorage.getItem("token");
    
    const { name, backdrop_path, first_air_date, id, overview, poster_path,media_type} =
      data;

    const movieDetails = {
      name,
      backdrop_path,
      first_air_date,
      id,
      overview,
      poster_path,
      media_type
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/faviorateMovie/add",
        movieDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Movie added to favorite list:", response.data);
    } catch (error) {
      console.error(
        "Error adding movie to favorite list:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="movieCard">
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
      <button className="faviorateText" onClick={()=>addFavoriteMovie()}>
        Add to faviorate <span className="faviorate">❤️</span>
      </button>
    </div>
  );
};

export default MovieCard;
