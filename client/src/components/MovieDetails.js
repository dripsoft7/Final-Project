import styled from "styled-components";
import { FaRegStar, FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { KEY, Image } from "../MovieAPI";
import moment from "moment";
import CastSection from "./CastSection";
import Footer from "./Footer";
import { FavoritesContext } from "../FavoritesContext";
import Spinner from "./Spinner";
import { useAuth0 } from "@auth0/auth0-react";

const MovieDetails = () => {
  const { id } = useParams();
  const { user, loginWithRedirect } = useAuth0();
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [crewMembers, setCrewMembers] = useState([]);
  const [crew, setCrew] = useState(false);
  const [buttonText, setButtonText] = useState("All cast & crew");
  const { handleFavorites } = useContext(FavoritesContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoaded(true);
        // console.log(data);
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${KEY}`)
          .then((res) => res.json())
          .then((data) => {
            setCast(data.cast);
            // console.log(data);
            setCrewMembers(data.crew);
            setLoaded(true);
          });
      });
  }, []);
  const castNames = cast.map((cast) => cast.name + ", ");
  const crewNames = crewMembers.map((crew) => crew.name + ", ");

  const handleCrew = () => {
    setCrew(!crew);
    const isButtonToggled = !buttonText;
    const changeText = isButtonToggled ? "All cast & crew" : "All cast & crew";

    return setButtonText(changeText);
  };

  const handleLogIn = () => {
    loginWithRedirect();
  };

  const movieScore = movie.vote_average;
  const movieScoreSlice = String(movieScore).slice(0, 3);

  return (
    <>
      {loaded ? (
        <Wrapper>
          <Main>
            <div>
              {movie && (
                <MovieImage src={`${Image}w500${movie?.poster_path}`} />
              )}
            </div>
            <InfoContainer>
              <InfoHeader>
                <TitleWrapper>
                  <MovieTitle>{movie.original_title}</MovieTitle>{" "}
                  <Timestamp>
                    {moment(movie.release_date).format("YYYY, MMM Do")}
                  </Timestamp>
                  <Runtime>• {movie.runtime} minutes</Runtime>
                </TitleWrapper>
                <Tagline>{movie.tagline}</Tagline>
              </InfoHeader>
              <RatingContainer>
                <div>
                  <ScoreTitle>BMDb Rating</ScoreTitle>
                  <ScoreText>
                    based on <NumReviews>{movie.vote_count}</NumReviews> reviews
                  </ScoreText>
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
                <Popularity>
                  {" "}
                  <PopularityText>
                    Popularity
                    <StyledFaHeart />
                  </PopularityText>{" "}
                  +{movie.popularity}
                </Popularity>
              </RatingContainer>
              <SummaryContainer>
                Summary
                <Summary>{movie.overview}</Summary>
              </SummaryContainer>
              <Div>
                {user ? (
                  <FavoriteButton
                    onClick={() => {
                      handleFavorites(movie.id);
                    }}
                  >
                    <div>
                      <FaRegStar />
                    </div>
                    <Option> Add to Favorites</Option>
                  </FavoriteButton>
                ) : (
                  <DisabledButton onClick={handleLogIn}>
                    <div>
                      <FaRegStar />
                    </div>
                    <Option>Sign in to add to favorites</Option>
                  </DisabledButton>
                )}
              </Div>
            </InfoContainer>
          </Main>
          <div>
            <ButtonContainer>
              <LoadCrew onClick={handleCrew}>{buttonText}</LoadCrew>
            </ButtonContainer>
            {crew && (
              <CastNamesContainer>
                {castNames} {crewNames}
              </CastNamesContainer>
            )}
            <CastTitle>Top Cast </CastTitle>
            <CastSection cast={cast} />
          </div>
        </Wrapper>
      ) : (
        <Spinner />
      )}
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

const Runtime = styled.div`
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

const NumReviews = styled.span`
  color: #45ccff;
`;

const StyledFaHeart = styled(FaHeart)`
  color: red;
  font-size: 21px;
  margin-left: 8px;
`;
const PopularityText = styled.h2`
  margin-bottom: 15px;
`;
const Popularity = styled.span`
  margin-left: 15rem;
  font-size: 17px;
`;
const ScoreTitle = styled.h2`
  margin-bottom: 15px;
`;

const ScoreText = styled.span`
  font-size: 25px;
  color: lightgrey;
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
const SummaryContainer = styled.div`
  padding: 15px 0;
  font-size: 25px;
  font-weight: bold;
`;
const Summary = styled.h5`
  padding: 15px 0;
  font-weight: 200;
  width: 75%;
  color: lightgray;
`;

const Div = styled.span`
  display: inline;
  padding: 10px;
`;

const DisabledButton = styled.button`
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
  border-radius: 20px;
  cursor: pointer;
  :hover {
    color: yellow;
  }
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
  border-radius: 20px;
  cursor: pointer;
  :hover {
    color: yellow;
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
