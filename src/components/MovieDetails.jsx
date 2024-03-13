import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";
const API_BASE = "https://api.tvmaze.com/shows";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(`${API_BASE}/${id}`);
        const movieData = await response.json();
        setMovieDetails(movieData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movieDetails.name}</h2>
      <img src={movieDetails.image.medium} alt={movieDetails.name} />
      <p dangerouslySetInnerHTML={{ __html: movieDetails.summary }} />
      <p>Genres: {movieDetails.genres.join(", ")}</p>
    </div>
  );
};

export default MovieDetails;
