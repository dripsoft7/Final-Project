import styled from "styled-components";
import { Image } from "../MovieAPI";
import { NavLink } from "react-router-dom";

//cast section in movie details
const CastSection = ({ cast }) => {
  return (
    <Wrapper>
      {cast.map((cast, index) => {
        if (cast.profile_path !== null)
          return (
            <>
              <CastContainer key={index}>
                <NavigationLink to={`/actor/${cast.id}`}>
                  <CastImage
                    src={
                      cast.profile_path && `${Image}w500${cast.profile_path}`
                    }
                  ></CastImage>
                </NavigationLink>
                <CastName>{cast.original_name}</CastName>
                <Character>{cast.character}</Character>
              </CastContainer>{" "}
            </>
          );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  align-items: center;
  grid-gap: 2rem;
  margin-top: 40px;
  margin-bottom: 50px;
`;

const CastContainer = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CastName = styled.span`
  font-weight: bold;
`;

const NavigationLink = styled(NavLink)``;
const Character = styled.span`
  color: grey;
`;
const CastImage = styled.img`
  max-width: 250px;
  padding: 10px;
  border: none;
  border-radius: 30px;
  opacity: 1;
  transition: all 0.3s ease 0s;
  &:hover {
    opacity: 0.8;
  }
`;

export default CastSection;
