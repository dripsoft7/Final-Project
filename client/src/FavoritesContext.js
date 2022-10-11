import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth0();
  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false); //if movie is favorited based on movie id
  const [ratings, setRatings] = useState([]);
  const [isRated, setIsRated] = useState(false);

  //get user
  useEffect(() => {
    if (user) {
      const headers = { email: user.email };
      fetch("/api/get-user", { headers })
        .then((res) => res.json())
        .then((data) => {
          setFavorites(data.data.favorites);
          setIsFavorited(true);
          setIsRated(true);
          console.log(data);
        })
        .catch((error) => console.log(error));
    } else if (!user) {
      setIsFavorited(true);
      setFavorites([]);
      setIsRated(true);
    }
  }, [user]);

  //saving the movie in favorites list
  const handleFavorites = (movieId) => {
    fetch("/api/add-favorites", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user, movieId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data.data.favorites);
        // setIsFavorited(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findMovie = (movieId) => {
    if (favorites.includes(movieId)) {
      return "Added to Favorites";
    } else {
      return null;
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        handleFavorites,
        favorites,
        setFavorites,
        isFavorited,
        setIsFavorited,
        findMovie,
        setIsRated,
        isRated,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
