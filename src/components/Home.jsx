import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Row from './Row';
import {
  fetchTrending,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchDocumentaries,
} from '../services/tmdb';

function Home() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Row title="Trending Now" fetchUrl={fetchTrending} isLargeRow />
      <Row title="Top Rated" fetchUrl={fetchTopRated} />
      <Row title="Action Movies" fetchUrl={fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={fetchDocumentaries} />
    </div>
  );
}

export default Home;
