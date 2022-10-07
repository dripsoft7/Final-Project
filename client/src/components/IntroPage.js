import styled from "styled-components";
import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Spinner from "./Spinner";
import { KEY } from "../MovieAPI";
import { useMovies } from "../MovieContext";

//first page user sees when opens website
const IntroPage = () => {
  const [loaded, setLoaded] = useState(false);
  const { movies, setMovies } = useMovies();

  //random page from 1-50
  const page = Math.floor(1 + Math.random() * 50);

  // fetching popular movies
  useEffect(() => {
    if (!loaded) {
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        })
        .finally(() => {
          setLoaded(true);
        });
    }
  }, []);

  return (
    <Wrapper>
      {loaded && movies ? (
        <Div>
          <WelcomeDiv>
            <WelcomeText>
              Welcome to <span style={{ color: "#0ccbff" }}>BMDb</span>
            </WelcomeText>
            <Description>
              BMDb (an abbreviation of Best Movie Database) is an online
              database of information related to films – including cast,
              production crew and personal biographies, plot summaries, and
              ratings.
            </Description>
          </WelcomeDiv>
          <Carousel movies={movies} />
        </Div>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-style: solid;
  border-color: #2c3032;
  padding: 80px 60px 0px 60px;
  height: 80vh;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const WelcomeText = styled.h2`
  margin-bottom: 10px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 17px;
  /* text-align: center; */
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
const WelcomeDiv = styled.div`
  color: white;
  width: 800px;
`;

export default IntroPage;
