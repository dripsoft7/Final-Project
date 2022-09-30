import styled from "styled-components";
import { useMovies } from "../MovieContext";
import { Image } from "../MovieAPI";
import { NavLink } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

const MovieGrid = () => {
  const { movies } = useMovies();
  return (
    <Wrapper>
      {movies.length > 0 ? (
        <>
          {movies.map((movie, index) => {
            // console.log(movie);
            return (
              <ImageContainer key={index}>
                <NavigationLink to={`/movie/${movie.id}`}>
                  <MovieImage
                    src={
                      movie.poster_path && `${Image}w500${movie.poster_path}`
                    }
                  />
                </NavigationLink>
                <BottomTextWrapper>
                  <MovieName to={`/movie/${movie.id}`}>
                    {movie.original_title}
                  </MovieName>
                  <MovieRating>
                    <StyledFiStar />
                    {movie.vote_average}
                  </MovieRating>
                </BottomTextWrapper>
              </ImageContainer>
            );
          })}{" "}
        </>
      ) : (
        <NotFoundText>Movie not Found</NotFoundText>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  align-items: center;
  grid-gap: 2rem;
  margin-top: 40px;
  padding: 12px;
`;
const StyledFiStar = styled(FaStar)`
  color: #f8e325;
  margin-left: 5px;
  margin-right: 5px;
`;

const NotFoundText = styled.h1`
  text-align: center;
`;
const MovieName = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;
const MovieRating = styled.span`
  color: lightgrey;
`;
const ImageContainer = styled.div`
  border: 10px solid transparent;
  display: flex;
  background-color: #222;
  border-radius: 35px;
  justify-content: center;
  flex-direction: column;
`;
const NavigationLink = styled(NavLink)``;

const BottomTextWrapper = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 5px;
  justify-content: space-around;
`;
const MovieImage = styled.img`
  width: 100%;
  /* padding: 20px; */
  border-top-left-radius: 33px;
  border-top-right-radius: 33px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  /* border-radius: 33px; */
  transition: all 0.3s ease 0s;
  opacity: 1;
  &:hover {
    opacity: 0.8;
  }
`;
export default MovieGrid;
