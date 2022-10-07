import styled from "styled-components";
import { useRef, useState } from "react";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import { Image } from "../MovieAPI";

//carousel in intro page, user can see list of movies
const Carousel = ({ movies }) => {
  // setting function for intro page carousel
  const listRef = useRef();
  const [slideNumber, setSlideNumber] = useState(0);
  const handleClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 333;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${520 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 7) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-220 + distance}px)`;
    }
  };
  return (
    <ListWrapper>
      <StyledRiArrowLeftSLine
        size={"80px"}
        onClick={() => {
          handleClick("left");
        }}
      />
      <Lists ref={listRef}>
        {movies.map((movie, index) => {
          return (
            <MovieImages key={index} src={`${Image}w780${movie.poster_path}`} />
          );
        })}
      </Lists>
      <StyledRiArrowRightSLine
        size={"80px"}
        onClick={() => {
          handleClick("right");
        }}
      />
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  background-color: #131d29;
  overflow: hidden;
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  width: 100%;
  position: relative;
`;

const StyledRiArrowRightSLine = styled(RiArrowRightSLine)`
  color: black;
  position: absolute;
  z-index: 1;
  margin: auto;
  cursor: pointer;
  background-color: #6f7779;
  opacity: 0.7;
  height: 100%;
  transition: all 200ms ease-in-out;
  right: 0;
  :hover {
    opacity: 0.5;
  }
`;

const StyledRiArrowLeftSLine = styled(RiArrowLeftSLine)`
  color: black;
  position: absolute;
  z-index: 1;
  margin: auto;
  opacity: 0.7;
  cursor: pointer;
  background-color: #6f7779;
  height: 100%;
  transition: all 200ms ease-in-out;
  left: 0;
  :hover {
    opacity: 0.5;
  }
`;
const MovieImages = styled.img`
  max-width: 500px;
  max-height: 500px;
  margin-right: 30px;
  border-radius: 10px;
  padding: 10px;
  transition: all 200ms ease-in-out;
  :hover {
    transform: scale(1.03);
    cursor: pointer;
  }
`;
const Lists = styled.div`
  /* width: max-content; */
  width: calc(100% - 40px);
  height: 500px;
  display: flex;
  transform: translateX(0px);
  transition: all 1s ease;
`;

export default Carousel;
