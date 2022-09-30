import { useContext, createContext, useState, useEffect } from "react";
import { URL, KEY } from "../src/MovieAPI";
import { useAuth0 } from "@auth0/auth0-react";

export const MovieContext = createContext(null);

export const useMovies = () => {
  return useContext(MovieContext);
};

const MovieProvider = ({ children }) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [favorites, setFavorties] = useState([]);
  const [appUser, setAppUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadPage = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`;
    getMovies(loadPage);
  }, []);

  // const addUserFavorite = (favorite) => {
  //   appUser.favorites = [...appUser.favorites, favorite];
  //   setAppUser(appUser);
  // };

  const getMovies = (path) => {
    fetch(path)
      .then((res) => res.json())
      .then((data) => {
        setMovies([...movies, ...data.results]);
        setCurrentPage(data.page);
      });
  };

  //handle to load following page of movies
  const handleClick = () => {
    const loadPage = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=${
      currentPage + 1
    }`;
    getMovies(loadPage);
  };

  //fetch favorties based on the user's email
  useEffect(() => {
    if (user) {
      fetch(`/users-favorites/` + user.email)
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setFavorties(data.result.favorites);
            setLoaded(true);
          } else {
            googleUserHandle(data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  //posting new user to users db
  const googleUserHandle = (data) => {
    fetch("/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ ...user, favorites: [] }),
    })
      .then(() => {
        setLoaded(true);
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  // fetch popular movies to put in home page
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MovieContext.Provider
      value={{ movies, handleClick, setMovies, favorites }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
