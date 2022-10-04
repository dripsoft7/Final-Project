import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
const Spinner = ({ size }) => {
  return (
    <Div>
      <CircularProgress size={size} style={{ color: "var(--color-font)" }} />
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
