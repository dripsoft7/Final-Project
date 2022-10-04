import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <h3>Oops something went wrong!</h3>
      <p>Please refresh</p>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  text-align: center;
  color: var(--color-font);
  font-size: 20px;
`;
