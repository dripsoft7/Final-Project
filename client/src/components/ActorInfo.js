import { useEffect, useState } from "react";
import styled from "styled-components";
import { KEY, Image } from "../MovieAPI";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

//actor details
const ActorInfo = () => {
  const [actors, setActors] = useState([]);
  const { actorId } = useParams();
  const [loaded, setLoaded] = useState(false);

  //fetch actor details by id
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${actorId}?api_key=${KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setActors(data);
        setLoaded(true);
        // console.log(data);
      });
  }, []);

  return (
    <>
      {loaded ? (
        <Wrapper>
          <ActorDiv>
            <ActorImg src={`${Image}w500${actors.profile_path}`}></ActorImg>
            <BirthText>
              <Birth>
                <strong>Born:</strong> {actors.birthday}
              </Birth>
              <PlaceOfBirth> in {actors.place_of_birth}</PlaceOfBirth>
            </BirthText>
          </ActorDiv>
          <InfoContainer>
            <Profession>
              <ActorName>{actors.name}</ActorName>
              <KnownFor>{actors.known_for_department}</KnownFor>
            </Profession>
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
  margin: 75px;
  background-color: rgba(26, 78, 120, 0.2);
  border-radius: 30px;
  /* justify-content: center; */
  /* flex-direction: column; */
`;

const ActorName = styled.h1`
  color: white;
  margin-bottom: 5px;
  font-size: 33px;
`;

const KnownFor = styled.span`
  font-style: italic;
  color: lightblue;
`;

const Profession = styled.div`
  margin-bottom: 30px;
  border-bottom: 1px solid grey;
  padding-bottom: 25px;
`;

const ActorImg = styled.img`
  display: flex;
  width: 350px;
  height: 500px;
  margin-left: 280px;
  margin-top: 50px;
  margin-right: 60px;
  border-radius: 30px;
`;
const ActorDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-end;
`;

const BirthText = styled.div`
  margin-top: 20px;
  color: lightgrey;
  margin-right: 60px;
  margin-bottom: 40px;
`;

const Birth = styled.span``;

const PlaceOfBirth = styled.span`
  position: relative;
  /* text-align: left; */
`;

const InfoContainer = styled.div`
  display: flex;
  margin-top: 35px;
  width: 50%;
  margin-left: 50px;
  flex-direction: column;
  word-wrap: break-word;
  margin-bottom: 50px;
`;

const BioTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 23px;
`;
const Biography = styled.span`
  letter-spacing: 1px;

  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
`;

export default ActorInfo;
