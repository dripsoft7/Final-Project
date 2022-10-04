import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Favorites = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const { user, loginWithRedirect, isLoading } = useAuth0();
  const [favoritedMovie, setFavoritedMovie] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user) {
      const headers = { email: user.email };
      fetch("/api/get-user-favorites", { headers })
        .then((res) => res.json())
        .then((data) => {
          setFavoritedMovie(data.data);
        })
        .catch((error) => setError(true));
    }
  }, [user]);

  const handleRemove = (id) => {
    const headers = { email: user.email };
    fetch(`/api/remove-favorite/${id}`, { method: "DELETE", headers })
      .then((res) => res.json())
      .then((data) => {
        setFavoritedMovie(data.data);
      })
      .catch((error) => setError(true));
  };
};

export default Favorites;
