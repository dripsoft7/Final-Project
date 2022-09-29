import styled from "styled-components";
import { FiHome, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <HeaderWrapper>
      <div>
        <Div>
          <NavigationLink to="/">
            <FiHome />
            <Option> Home</Option>
          </NavigationLink>
        </Div>
      </div>
      <Title>BMDb</Title>
      {/* <Img src="./images/logo.jpg" alt="logo" /> */}
      <Div>
        <NavigationLink to="/login">
          <FiUser /> <Option> Sign in</Option>
        </NavigationLink>
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

const Title = styled.h1``;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin: 0 13px;
  display: flex;
  font-size: 20px;
  padding: 10px;
  :hover {
    color: purple;
    border-radius: 20px;
  }
`;

const Option = styled.div`
  margin: 0 10px;
`;

export default Header;
