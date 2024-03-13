import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";

const API_BASE = "https://api.tvmaze.com/shows";

function App() {
  const [genresData, setGenresData] = useState({
    "Science-Fiction": [],
    Crime: [],
    Drama: [],
    Action: [],
    Comedy: [],
    Horror: [],
    Romance: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_BASE);
        const newData = await response.json();
        const formattedData = newData.map((show) => ({
          id: show.id,
          name: show.name,
          image: show.image.medium,
          genres: show.genres,
          summary: show.summary,
        }));

        setGenresData((prevGenresData) => {
          const updatedGenresData = { ...prevGenresData };
          formattedData.forEach((movie) => {
            movie.genres.forEach((genre) => {
              if (updatedGenresData.hasOwnProperty(genre)) {
                updatedGenresData[genre].push(movie);
              }
            });
          });
          return updatedGenresData;
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container">
        {Object.entries(genresData).map(([genre, movies]) => (
          <div key={genre} className="genre-container">
            <h2>{genre}</h2>
            <div className="carousel">
              <div className="carousel-container">
                {movies.map((movie, index) => (
                  <div key={index} className="movie">
                    <img src={movie.image} alt={movie.name} />
                    <h3>{movie.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
