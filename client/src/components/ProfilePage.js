import styled from "styled-components";
import { NavLink } from "react-router-dom";
const ProfilePage = () => {
  return (
    <Wrapper to={"/profile"}>
      <h1>Profile</h1>;
    </Wrapper>
  );
};

const Wrapper = styled(NavLink)``;
export default ProfilePage;
