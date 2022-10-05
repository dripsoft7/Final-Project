import shield from "../images/shield.gif";
import styled from "styled-components";

const Spinner2 = () => {
  return (
    <Div>
      <img src={shield} />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-font);
  height: 100vh;
  padding: 50px;
  img {
    width: 10vw;
    height: 10v;
  }
`;
export default Spinner2;
