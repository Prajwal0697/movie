import React, { useState, useEffect } from 'react';
import { fetchTrending, IMAGE_BASE_URL } from '../services/tmdb';
import './Hero.css';

function Hero() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await fetchTrending();
      const movies = request.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className="hero"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("${IMAGE_BASE_URL}${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="hero__contents">
        <h1 className="hero__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="hero__buttons">
          <button className="hero__button">Play</button>
          <button className="hero__button">My List</button>
        </div>
        <h1 className="hero__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="hero--fadeBottom" />
    </header>
  );
}

export default Hero;
