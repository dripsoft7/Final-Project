import styled from "styled-components";
import { Image } from "../MovieAPI";

const CastSection = ({ cast }) => {
  // console.log(cast);
  return (
    <Wrapper>
      {cast.map((cast, index) => {
        if (cast.profile_path !== null)
          return (
            <CastContainer key={index}>
              <a />
              <CastImage
                src={cast.profile_path && `${Image}w500${cast.profile_path}`}
              />
              <CastName>{cast.original_name}</CastName>
              <Character>{cast.character}</Character>
            </CastContainer>
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CastName = styled.span`
  font-weight: bold;
`;

const Character = styled.span`
  color: grey;
`;
const CastImage = styled.img`
  max-width: 250px;
  padding: 10px;
  border-radius: 30px;
`;

export default CastSection;
