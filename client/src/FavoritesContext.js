import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth0();
  const [favorites, setFavorites] = useState([]);

  //get user
  useEffect(() => {
    if (user) {
      const headers = { email: user.email };
      fetch("/api/get-user", { headers })
        .then((res) => res.json())
        .then((data) => {
          setFavorites(data.data.favorites);
        })
        .catch((error) => console.log(error));
    } else if (!user) {
      setFavorites([]);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FavoritesContext.Provider
      value={{
        handleFavorites,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
