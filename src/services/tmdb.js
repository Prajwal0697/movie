import axios from 'axios';

const API_KEY = '0a711aab61f849bbbce773611ee0ef44';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchTrending = () => {
  return api.get('/trending/movie/week');
};

export const fetchTopRated = () => {
  return api.get('/movie/top_rated');
};

export const fetchActionMovies = () => {
  return api.get('/discover/movie', {
    params: {
      with_genres: 28,
    },
  });
};

export const fetchComedyMovies = () => {
  return api.get('/discover/movie', {
    params: {
      with_genres: 35,
    },
  });
};

export const fetchHorrorMovies = () => {
  return api.get('/discover/movie', {
    params: {
      with_genres: 27,
    },
  });
};

export const fetchRomanceMovies = () => {
  return api.get('/discover/movie', {
    params: {
      with_genres: 10749,
    },
  });
};

export const fetchDocumentaries = () => {
  return api.get('/discover/movie', {
    params: {
      with_genres: 99,
    },
  });
};

export const fetchNetflixOriginals = () => {
  return api.get('/discover/movie', {
    params: {
      with_networks: 213,
    },
  });
};

export { IMAGE_BASE_URL };
