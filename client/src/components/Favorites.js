import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { KEY, Image } from "../MovieAPI";
import Spinner2 from "./Spinner2";
import { FiX } from "react-icons/fi";
import { FavoritesContext } from "../FavoritesContext";
import { FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Favorites = () => {
  const { user, isLoading, loginWithRedirect } = useAuth0();
  const [favoritedMovie, setFavoritedMovie] = useState([]);
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  //get a list of user movie Id's from favorites array
  useEffect(() => {
    if (user) {
      const headers = { email: user.email };
      fetch("/api/get-user-favorites", { headers })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.data);
          setFavorites(data.data);
        })
        .catch((error) => setError(true));
    }
  }, [user]);

  // getting all movies from favorites based on their IDs
  useEffect(() => {
    if (favorites) {
      const movieLength = favorites.length;
      let fetchTracker = 0;
      const moviesInFavorites = [];
      if (favorites.length !== 0) {
        favorites.map((id) => {
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`
          )
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              fetchTracker++;
              if (!moviesInFavorites.includes(data)) {
                moviesInFavorites.push(data);
              }
              if (fetchTracker === movieLength) {
                setLoaded(true);
                setFavoritedMovie(moviesInFavorites);
              }
            })
            .catch((error) => setError(true));
        });
      } else {
        setLoaded(true);
        setFavoritedMovie([]);
      }
    }
  }, [favorites]);

  useEffect(() => {
    if (user) {
      setLoaded(false);
    }
  }, [user]);

  const handleLogIn = () => {
    loginWithRedirect();
  };

  // handle removing movie from favorites list
  const handleRemove = (id) => {
    const headers = { email: user.email };
    // console.log(headers);
    // console.log(id);
    fetch(`/api/remove-favorite/${id}`, { method: "DELETE", headers })
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data.data);
        // console.log(data.data);
      })
      .catch((error) => setError(true));
  };

  if (isLoading) {
    return (
      <Wrapper style={{ textAlign: "center" }}>
        <Spinner2 />
      </Wrapper>
    );
  }

  //if user doesn't have anything in their favorites
  if (loaded && favoritedMovie.length === 0 && user) {
    return (
      <Wrapper style={{ textAlign: "center" }}>
        <Title>Your Favorites</Title>
        <h3>Your list is empty!</h3>
      </Wrapper>
    );
  }
  // if user is not signed in, login redirect
  if (loaded && !user) {
    return (
      <Wrapper style={{ textAlign: "center" }}>
        <Title>Sign in to access this page</Title>
        <RedirectButton onClick={handleLogIn}>
          Click Here to Sign In
        </RedirectButton>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>Your Favorites</Title>
      {loaded && favoritedMovie.length > 0 ? (
        <>
          <Movies>
            {favoritedMovie.map((movie, index) => {
              return (
                <FavMovie>
                  <MovieDiv>
                    <MovieImageDiv>
                      <MovieRedirect to={`/movie/${movie.id}}`}>
                        <MovieImage src={`${Image}w500${movie.poster_path}`} />
                      </MovieRedirect>
                      <Info>
                        <MovieRedirect to={`/movie/${movie.id}}`}>
                          <MovieTitle>
                            {movie.original_title}{" "}
                            <ReleasedDate>
                              ({String(movie.release_date).slice(0, 4)})
                            </ReleasedDate>
                          </MovieTitle>
                        </MovieRedirect>{" "}
                        <Rating>
                          <StyledFaStar />
                          {String(movie.vote_average).slice(0, 3)}{" "}
                        </Rating>{" "}
                        <Runtime>{movie.runtime} minutes</Runtime>
                        <VoteCount>Votes: {movie.vote_count}</VoteCount>
                      </Info>
                    </MovieImageDiv>
                  </MovieDiv>
                  <Remove
                    onClick={() => {
                      handleRemove(movie.id);
                    }}
                  >
                    <FiX />
                  </Remove>
                </FavMovie>
              );
            })}
          </Movies>
        </>
      ) : (
        <Spinner2 />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: white;
  padding: 20px 60px 0px 60px;
  height: 100vh;
  background-color: #131d29;
  margin-left: 270px;
  margin-right: 270px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Title = styled.h1`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 60px;
`;
const Movies = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 500px;
  justify-content: space-around;
  align-items: flex-start;
`;
const FavMovie = styled.div`
  display: flex;
  align-items: flex-start;
`;

const MovieTitle = styled.h2`
  font-size: 22px;
  padding-bottom: 25px;
  border-bottom: 1px solid grey;
`;

const RedirectButton = styled.button`
  border-radius: 5px;
  border: none;
  padding: 4px 10px;
  background-color: #0ccbff;
  cursor: pointer;
  font-weight: bold;
  width: 150px;
  height: 50px;
  transition: transform 200ms ease-in;
  transition: background-color 200ms ease-in-out;
  :hover {
    background-color: teal;
    transform: scale(1.03);
  }
`;
const MovieDiv = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  min-height: 230px;
  background-color: black;
  border-radius: 6px;
  padding: 15px;
`;

const StyledFaStar = styled(FaStar)`
  color: #f3ce00;
  font-size: 11px;
  margin-right: 7px;
`;
const Rating = styled.span`
  /* border-top: 1px solid grey; */
  font-size: 15px;
`;

const VoteCount = styled.span`
  color: #666;
`;
const Runtime = styled.span`
  color: lightgrey;
`;

const ReleasedDate = styled.span`
  letter-spacing: 1px;
  color: #a6a7a8;
`;

const MovieRedirect = styled(NavLink)`
  color: white;

  &:hover {
    text-decoration: 1px underline;
  }
`;

const MovieImage = styled.img`
  max-width: 260px;
  min-width: 240px;
  max-height: 160px;
  min-height: 310px;
  border-radius: 6px;
  margin-right: 20px;
`;
const MovieImageDiv = styled.div`
  display: flex;
  padding-bottom: 15px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Remove = styled.button`
  margin-left: 6px;
  padding: 2px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: inherit;
  border: 0.3px solid #333123;

  color: #ff0000;
  cursor: pointer;
  font-size: 20px;
`;

export default Favorites;
