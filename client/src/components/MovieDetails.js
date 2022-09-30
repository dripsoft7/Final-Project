import styled from "styled-components";
import { FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMovies } from "../MovieContext";
import { KEY, Image } from "../MovieAPI";
import moment from "moment";
import { IconContext } from "react-icons";
import CastSection from "./CastSection";
import Footer from "./Footer";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState(false);
  const [buttonText, setButtonText] = useState("All cast & crew");
  const { addMovie } = useMovies();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${KEY}`)
          .then((res) => res.json())
          .then((data) => {
            setCast(data.cast);
          });
      });
  }, []);
  const castNames = cast.map((cast) => cast.name + ", ");

  const handleCrew = () => {
    setCrew(!crew);
    const isButtonToggled = !buttonText;
    const changeText = isButtonToggled ? "All cast & crew" : "All cast & crew";

    return setButtonText(changeText);
  };

  const movieScore = movie.vote_average;
  const movieScoreSlice = String(movieScore).slice(0, 3);

  //   const dispatch = useDispatch();

  return (
    <>
      <Wrapper>
        <Main>
          <div>
            {movie && <MovieImage src={`${Image}w500${movie?.poster_path}`} />}
          </div>
          <InfoContainer>
            <InfoHeader>
              <TitleWrapper>
                <MovieTitle>{movie.original_title}</MovieTitle>{" "}
                <Timestamp>
                  {moment(movie.release_date).format("YYYY, MMM Do")}
                </Timestamp>
              </TitleWrapper>
              <Tagline>{movie.tagline}</Tagline>
            </InfoHeader>
            <RatingContainer>
              <div>
                <ScoreTitle>BMDb Rating</ScoreTitle>
                <ScoreText>based on {movie.vote_count} reviews</ScoreText>
              </div>
              <Score
                style={
                  movieScoreSlice < 6
                    ? { backgroundColor: "red" }
                    : movieScoreSlice < 7.5
                    ? { backgroundColor: "orange" }
                    : { backgroundColor: "green" }
                }
              >
                {movieScoreSlice}
              </Score>
            </RatingContainer>
            <SummaryContainer>
              Summary
              <Summary>{movie.overview}</Summary>
            </SummaryContainer>
            <Div>
              {/* <FavoriteButton onClick={() => addMovie({ movie })}> */}
              <IconContext.Provider
                value={{
                  color: "yellow",

                  size: "2em",
                  className: "global-class-name",
                }}
              >
                <div>
                  <FaRegStar />
                </div>
              </IconContext.Provider>
              <Option> Favorite</Option>
              {/* </FavoriteButton> */}
            </Div>
          </InfoContainer>
        </Main>
        <div>
          <ButtonContainer>
            <LoadCrew onClick={handleCrew}>{buttonText}</LoadCrew>
          </ButtonContainer>
          {crew && <CastNamesContainer>{castNames}</CastNamesContainer>}
          <CastTitle>Top Cast ></CastTitle>
          <CastSection cast={cast} />
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};
const Wrapper = styled.div``;

const Main = styled.div`
  display: flex;
`;

const InfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid grey;
  padding: 10px;
`;

const MovieTitle = styled.h1`
  font-size: 40px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;
const Tagline = styled.span`
  font-style: italic;
  color: lightgrey;
  padding-bottom: 5px;
`;
const MovieImage = styled.img`
  width: 450px;
  height: 600px;
  margin: 50px;
  border-radius: 30px;
`;

const InfoContainer = styled.div`
  margin-top: 50px;
  min-width: 500px;
`;

const CastTitle = styled.h1`
  text-align: center;
  margin-top: 30px;
`;

const Timestamp = styled.div`
  color: #bebdc4;
  font-size: 15px;
  margin-left: 1.5rem;
`;

const RatingContainer = styled.div`
  display: flex;
  padding: 50px 0;
  min-width: 500px;
  justify-content: baseline;
  border-bottom: 1px solid grey;
`;

const ScoreTitle = styled.h2`
  margin-bottom: 15px;
`;

const ScoreText = styled.p`
  font-size: 25px;
`;

const Score = styled.h1`
  display: flex;
  align-items: center;
  min-width: 60px;
  min-height: 60px;
  padding: 10px;
  border-radius: 5px;
  margin-left: 8rem;
`;
const SummaryContainer = styled.h3`
  padding: 15px 0;
  font-size: 25px;
`;
const Summary = styled.h5`
  padding: 15px 0;
  font-weight: 200;
  width: 75%;
`;

const Div = styled.span`
  display: inline;
  padding: 10px;
`;

const FavoriteButton = styled.button`
  text-decoration: none;
  background-color: #222;
  color: white;
  font-weight: bold;
  margin: 0 13px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 20px;
  padding: 10px;
  border: none;

  cursor: pointer;
  :hover {
    color: yellow;
    border-radius: 20px;
  }
`;

const Option = styled.div`
  margin: 0 10px;
`;

const CastNamesContainer = styled.div`
  display: flex;
  font-size: 20px;
  margin: 30px;
  text-align: center;
  color: #bebdc4;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadCrew = styled.button`
  border: none;
  background: #404040;
  color: white;
  font-weight: bold;
  padding: 15px;
  text-transform: uppercase;
  border-radius: 6px;
  /* display: inline-block; */
  transition: all 0.3s ease 0s;
  cursor: pointer;
  :hover {
    color: #404040;
    letter-spacing: 3px;
    background: beige;
    transition: all 0.3s ease 0s;
  }
`;

export default MovieDetails;
