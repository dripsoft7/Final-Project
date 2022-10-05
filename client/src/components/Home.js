import styled from "styled-components";
import { Image } from "../MovieAPI";
import FeaturedMovie from "./FeaturedMovie";
import MovieGrid from "./MovieGrid";
import { useMovies } from "../MovieContext";
import { KEY } from "../MovieAPI";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Home = () => {
  const { movies, handleClick, setMovies } = useMovies();
  const [movie, setMovie] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const url = `https://api.themoviedb.org/3/search/movie?&api_key=${KEY}&query=`;

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      fetch(url + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
        });
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleOnSubmit}>
        <SearchBar
          placeholder="Search BMDb"
          value={searchTerm}
          onChange={handleOnChange}
        ></SearchBar>
        <StyledBiSearch />
      </Form>
      {movies[0] && (
        <FeaturedMovie
          image={`${Image}w1280${movies[0].backdrop_path}`}
          title={movies[0].original_title}
          text={movies[0].overview}
        />
      )}
      {movies && <MovieGrid />}
      <ButtonContainer>
        <LoadMovies onClick={handleClick}>Load more</LoadMovies>
      </ButtonContainer>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  margin: 0;
`;

const Form = styled.form`
  /* margin-top: -2.62rem; */
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBar = styled.input`
  height: 10px;
  width: 500px;
  border-radius: 10px;
  margin-right: 10px;
  border: none;
  outline: none;
  color: #343a40;
  background-color: white;
  border: 1px solid #343a40;
  padding: 20px 6px;
`;
const StyledBiSearch = styled(BiSearch)`
  color: darkgrey;
  font-size: 20px;
`;
const LoadMovies = styled.button`
  border: none;
  background: #404040;
  color: #ffffff;
  font-weight: 100;
  padding: 20px;
  text-transform: uppercase;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 1rem;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  :hover {
    color: #404040;
    font-weight: 700;
    letter-spacing: 3px;
    background: beige;
    transition: all 0.3s ease 0s;
  }
`;

export default Home;
