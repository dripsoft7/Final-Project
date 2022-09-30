import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const UserToggle = () => {
  //conditional for user login and logout
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <Button
      onClick={() =>
        isAuthenticated
          ? logout({ returnTo: window.location.origin })
          : loginWithRedirect()
      }
    >
      {isAuthenticated ? "Sign Out" : "Sign In"}
    </Button>
  );
};

const Button = styled.button`
  margin-right: 20px;
  background: none;
  color: white;
  font-weight: bold;
  font-size: 20px;
  border: none;

  &:hover {
    cursor: pointer;
    filter: drop-shadow(0 4px 5px hsla(360, 100%, 0%, 0.5));
  }
`;

export default UserToggle;
