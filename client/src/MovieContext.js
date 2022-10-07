import { useContext, createContext, useState, useEffect } from "react";
import { URL, KEY } from "../src/MovieAPI";

export const MovieContext = createContext(null);

export const useMovies = () => {
  return useContext(MovieContext);
};

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  // useEffect(() => {
  //   const loadPage = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`;
  //   getMovies(loadPage);
  // }, []);

  const getMovies = (path) => {
    fetch(path)
      .then((res) => res.json())
      .then((data) => {
        setMovies([...movies, ...data.results]);
        setCurrentPage(data.page);
      });
  };

  const page = Math.floor(1 + Math.random() * 20);
  //handle to load following page of movies
  const handleClick = () => {
    const loadPage = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=${
      currentPage + 1
    }`;
    getMovies(loadPage);
  };

  // fetch popular movies to put in home page
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MovieContext.Provider
      value={{ movies, handleClick, setMovies, favorites, setFavorites }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
