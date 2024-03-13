import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import MovieDetails from "./components/MovieDetails"; // Importe o componente para exibir os detalhes do filme
import "./App.css";

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
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/">
              {Object.entries(genresData).map(([genre, movies]) => (
                <div key={genre} className="genre-container">
                  <h2>{genre}</h2>
                  <div className="carousel">
                    <div className="carousel-container">
                      {movies.map((movie, index) => (
                        <Link
                          to={`/movies/${movie.id}`}
                          key={index}
                          className="movie"
                        >
                          <h3>{movie.name}</h3>
                          <img src={movie.image} alt={movie.name} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </Route>
            <Route
              path="/movies/:id"
              render={(props) => (
                <MovieDetails key={props.match.params.id} {...props} />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
