import React, { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/Header";

function App() {
  const API_BASE = "https://api.tvmaze.com/shows";

  const [data, setData] = useState([]);
  const [scienceFiction, setScienceFiction] = useState([]);
  const [crime, setCrime] = useState([]);
  const [drama, setDrama] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [romance, setRomance] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}`)
      .then((response) => response.json())
      .then((newData) => {
        const results = newData.map((item) => ({
          id: item.id,
          genres: item.genres,
          name: item.name,
          image: {
            medium: item.image.medium,
            original: item.image.original,
          },
          sumary: item.summary,
        }));
        setData(results);
      })
      .catch((error) => console.erro(error));
  }, [data]);

  const handlerSetGenres = (movie, gender) => {
    switch (gender) {
      case "Science-Fiction": {
        let scienceFictionMovies = scienceFiction;
        scienceFictionMovies.push(movie);
        return setScienceFiction(scienceFictionMovies);
      }
      case "Crime": {
        let crimeMovies = crime;
        crimeMovies.push(movie);
        return setCrime(crimeMovies);
      }
      case "Drama": {
        let dramaMovies = drama;
        dramaMovies.push(movie);
        return setDrama(dramaMovies);
      }
      case "Action": {
        let actionMovies = action;
        actionMovies.push(movie);
        return setAction(actionMovies);
      }
      case "Comedy": {
        let comedyMovies = comedy;
        comedyMovies.push(movie);
        return setComedy(comedyMovies);
      }
      case "Horror": {
        let horrorMovies = horror;
        horrorMovies.push(movie);
        return setHorror(horrorMovies);
      }
      case "Romance": {
        let romanceMovies = romance;
        romanceMovies.push(movie);
        return setRomance(romanceMovies);
      }
      default:
        return null;
    }
  };

  const searchLowCase = search.toLowerCase();

  const filterMavies = data.map((movie) => {
    return { id: movie.id, name: movie.name, image: movie.image.medium };
  });

  const resName = filterMavies
    .map((movie) => movie.name)
    .filter((name) => {
      return name.toLowerCase().includes(searchLowCase);
    });

  const filterGenres = (genres) => {
    data.map((movie) => {
      return movie.genres.map((gender) => {
        return handlerSetGenres(movie, gender);
      });
    });
  };

  useEffect(() => {
    filterGenres();
  });

  return (
    <div className="App">
      <Header />
      <div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul>
          {resName.map((movie, id) => (
            <li key={id}>{movie}</li>
          ))}
        </ul>
      </div>
      <p>Drama</p>
      <ul>
        {data.map((movie, id) => (
          <li key={id}>
            <img src={movie.image.medium} alt="" />
          </li>
        ))}
      </ul>
      <p>Ação</p>
      <ul>
        {data.map((movie, id) => (
          <li key={id}>
            <img src={movie.image.medium} alt="" />
          </li>
        ))}
      </ul>
      <p>Romance</p>
      <ul>
        {data.map((movie, id) => (
          <li key={id}>
            <img src={movie.image.medium} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
