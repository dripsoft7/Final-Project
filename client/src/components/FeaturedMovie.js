import styled from "styled-components";

const FeaturedMovie = ({ image, title, text }) => {
  return (
    <Wrapper image={image}>
      <div>
        <Container>
          <Title>"{title}"</Title>
          <Text>{text}</Text>
        </Container>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${({ image }) => {
    return `url(${image})`;
  }};
  min-height: 600px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 90%, auto;

  position: relative;
`;

const Container = styled.div`
  position: absolute;
  width: 92%;
  bottom: 0rem;
  text-align: center;
  margin-left: 5.5rem;
  background-color: black;
  opacity: 0.8;
  padding: 20px;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 5px;
`;
const Text = styled.p`
  font-size: 20px;
  margin-left: 80px;
  margin-right: 80px;
  color: #afabaf;
`;

export default FeaturedMovie;
