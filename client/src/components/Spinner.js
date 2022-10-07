import styled from "styled-components";
import grogu from "../images/grogu.gif";

//loading spinner
const Spinner = () => {
  return (
    <Div>
      <img src={grogu} />
    </Div>
  );
};

export default Spinner;

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
