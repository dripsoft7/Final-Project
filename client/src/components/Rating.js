import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FavoritesContext } from "../FavoritesContext";

const Rating = ({ movieId }) => {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);
  const { user } = useAuth0();
  const { findMovie, isRated } = useContext(FavoritesContext);
  const addedMovie = findMovie(movieId);
  return (
    <Wrapper>
      {" "}
      {user ? (
        <>
          {isRated ? (
            !addedMovie ? (
              <Text>Your Rating: {rating}</Text>
            ) : addedMovie === "Added to Favorites" ? (
              <Text>You Rated: {rating}</Text>
            ) : (
              <h1></h1>
            )
          ) : (
            ""
          )}

          {/* <Text>Your rating: {rating}</Text> */}
          {[...Array(10)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <RatingBar>
                <Stars
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />

                <FaStar
                  className="star"
                  color={ratingValue <= (hover || rating) ? "#5799ef" : "white"}
                  size={20}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </RatingBar>
            );
          })}
        </>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

const Text = styled.p`
  margin-right: 20px;
`;
const RatingBar = styled.label`
  cursor: pointer;
`;

const Stars = styled.input`
  display: none;
`;

export default Rating;
