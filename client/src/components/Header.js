import styled from "styled-components";
import { FiHome, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import UserToggle from "./UserToggle";
import ProfilePage from "./ProfilePage";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  return (
    <HeaderWrapper>
      <div>
        <Div>
          <NavigationLink to="/">
            <FiHome />
            <Option> Home </Option>
          </NavigationLink>
        </Div>
      </div>
      <Title>BMDb</Title>
      {/* <Img src="./images/logo.jpg" alt="logo" /> */}
      <Div>
        {isAuthenticated && <ProfilePage>Profile</ProfilePage>}
        <SignInWrapper>
          <FiUser /> <UserToggle />
        </SignInWrapper>
      </Div>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 22px;
  background-color: #222;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
`;

const Div = styled.span`
  display: flex;
  text-decoration: none;
  padding: 10px;
  justify-content: baseline;
`;

const SignInWrapper = styled.div`
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin-right: 35px;
  display: flex;
  justify-content: baseline;
  align-items: baseline;
  font-size: 20px;
  padding: 10px;
  :hover {
    background-color: hsla(45, 0%, 80%, 0.1);
    cursor: pointer;
    border-radius: 20px;
  }
  :active {
    background-color: hsla(45, 0%, 80%, 0.4);
  }
`;
const Title = styled.h1``;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin: 0 13px;
  display: flex;
  justify-content: baseline;
  font-size: 20px;
  padding: 10px;
  :hover {
    background-color: hsla(45, 0%, 80%, 0.1);
    cursor: pointer;
    border-radius: 20px;
  }
  :active {
    background-color: hsla(45, 0%, 80%, 0.4);
  }
`;

const Option = styled.div`
  margin: 0 10px;
`;

export default Header;
