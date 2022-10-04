import styled from "styled-components";
import { FiHome, FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import UserToggle from "./UserToggle";
import ProfilePage from "./ProfilePage";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { RiLoginBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Favorites from "./Favorites";
import { FaStar, FaRegStar } from "react-icons/fa";

const Header = () => {
  const { user, loginWithRedirect, logout } = useAuth0();
  const [toggleProfileMenu, setToggleProfileMenu] = useState(false);
  const menuRef = useRef(null);
  const [error, setError] = useState(false);

  const handleClick = () => {
    setToggleProfileMenu(!toggleProfileMenu);
  };

  const handleLogIn = () => {
    loginWithRedirect();
  };
  const handleLogOut = () => {
    sessionStorage.clear();
    logout({ returnTo: window.location.origin });
  };
  const handleSignUp = () => {
    loginWithRedirect();
  };

  // add user to mongodb
  useEffect(() => {
    let userName = sessionStorage.getItem("email");
    // console.log(user);
    if (user && !userName) {
      fetch("/api/new-user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ user }),
      })
        .then((res) => res.json())
        .then((data) => {})
        .then(user && sessionStorage.setItem("email", user.email))

        .catch((error) => {
          setError(true);
        });
    }
  }, [user]);

  // dropdown menu is closed when clicking other part of the page
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (menuRef.current !== null && !menuRef.current.contains(e.target)) {
        setToggleProfileMenu(!toggleProfileMenu);
      }
    };
    if (toggleProfileMenu) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [toggleProfileMenu]);

  const navigate = useNavigate();
  const handleGoToProfile = () => {
    navigate("/profile");
  };

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
        {user && (
          <NavigationLink to="/favorites">
            <StyledFaStar />
            Favorites
          </NavigationLink>
        )}
        <ProfileMenu>
          {" "}
          <Profile onClick={handleClick} ref={menuRef}>
            {user ? (
              <img src={user.picture} alt="profile" />
            ) : (
              <StyledFiUserPlus />
            )}
          </Profile>
          {user && (
            <UserMenuWrapper className={toggleProfileMenu ? "active" : ""}>
              <MenuItem onClick={handleGoToProfile}>
                <CgProfile style={{ marginRight: "8px" }} />
                <p>Profile</p>
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <RiLogoutBoxRLine style={{ marginRight: "8px" }} />
                <p>Logout</p>
              </MenuItem>
            </UserMenuWrapper>
          )}
          {!user && (
            <UserMenuWrapper className={toggleProfileMenu ? "active" : ""}>
              <MenuItem onClick={handleLogIn}>
                <RiLoginBoxLine style={{ marginRight: "8px" }} />
                <p>Log In</p>
              </MenuItem>
              <MenuItem onClick={handleSignUp}>
                <FiUserPlus style={{ marginRight: "8px" }} />
                <p>Sign Up</p>
              </MenuItem>
            </UserMenuWrapper>
          )}
        </ProfileMenu>
        {/* {isAuthenticated && <ProfilePage>Profile</ProfilePage>} */}
      </Div>
    </HeaderWrapper>
  );
};

const Profile = styled.button`
  margin-right: 4.5rem;
  outline: none;
  border: none;
  background-color: var(--color-primary);
  right: 0;
  padding: 5px;
  &:hover {
    background-color: hsla(45, 0%, 80%, 0.1);
    cursor: pointer;
    border-radius: 20px;
  }
  :active {
    background-color: hsla(45, 0%, 80%, 0.4);
  }
  img {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    animation-name: example;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    @keyframes example {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const StyledFaStar = styled(FaStar)`
  color: yellow;
  margin-right: 5px;
`;
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
const ProfileMenu = styled.div`
  position: relative;
`;

const UserMenuWrapper = styled.div`
  position: absolute;
  right: 48px;
  background-color: #000708;
  color: var(--color-font);
  display: flex;
  flex-direction: column;
  width: 110px;
  border-radius: 10px;
  padding: 10px 5px;
  opacity: 0;
  z-index: 1;
  visibility: hidden;
  transform: translateY(-10px);
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out,
    visibility 250ms;
  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0px);
  }
`;

const StyledFiUserPlus = styled(FiUserPlus)`
  color: white;
  font-size: 30px;
  margin-right: 8px;
`;
const MenuItem = styled.div`
  display: flex;
  padding: 5px;
  border-radius: 5px;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #131d29;
  }
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
  margin-right: 0px;
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
  align-items: center;
  justify-content: baseline;
  font-size: 20px;
  margin-right: 30px;
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
