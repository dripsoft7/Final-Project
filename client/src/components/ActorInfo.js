import { useEffect, useState } from "react";
import styled from "styled-components";
import { KEY, Image } from "../MovieAPI";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

const ActorInfo = () => {
  const [actors, setActors] = useState([]);
  const { actorId } = useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setActors(data);
        setLoaded(true);
        console.log(data);
      });
  }, []);

  return (
    <>
      {loaded ? (
        <Wrapper>
          <ActorDiv>
            <ActorName>{actors.name}</ActorName>
            <ActorImg src={`${Image}w500${actors.profile_path}`}></ActorImg>
            <BirthText>
              <Birth>
                <strong>Born:</strong> {actors.birthday}
              </Birth>
              <PlaceOfBirth> in {actors.place_of_birth}</PlaceOfBirth>
            </BirthText>
          </ActorDiv>
          <InfoContainer>
            <BioTitle>Biography</BioTitle>
            <Biography>{actors.biography}</Biography>
          </InfoContainer>
        </Wrapper>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  /* flex-direction: column; */
`;
const ActorName = styled.h1`
  color: white;
`;
const ActorImg = styled.img`
  display: flex;
  width: 300px;
  height: 450px;
  margin-left: 280px;
  margin-right: 60px;
  border-radius: 30px;
`;
const ActorDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
`;

const BirthText = styled.span`
  margin-top: 20px;
  color: lightgrey;
`;

const Birth = styled.span``;

const PlaceOfBirth = styled.span``;
const InfoContainer = styled.div`
  display: flex;
  margin-top: 110px;
  width: 50%;
  margin-left: 50px;
  flex-direction: column;
  word-wrap: break-word;
`;

const BioTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 26px;
`;
const Biography = styled.span`
  letter-spacing: 1px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

export default ActorInfo;
