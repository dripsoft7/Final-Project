import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import { AiOutlineDown } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Error from "./Error";

const ProfilePage = () => {
  const { logout, user, isLoading } = useAuth0();
  const [userInfo, setUserInfo] = useState([]);
  const [error, setError] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      const headers = { email: user.email };
      fetch("/api/get-user", { headers })
        .then((res) => res.json())
        .then((data) => {
          setUserInfo(data.data);
          setLoaded(true);
        })
        .catch((error) => setError(true));
    }
  }, [user]);

  const handleHistory = () => {
    setHistoryOpen(!historyOpen);
  };

  const handleAccount = () => {
    setAccountOpen(!accountOpen);
  };

  const handleDeleteAccount = () => {
    const headers = { email: user.email };
    fetch("/api/delete-account", { method: "DELETE", headers })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => setError(true))
      .finally(logout({ returnTo: window.location.origin }));
  };

  return (
    <Wrapper>
      {!error ? (
        loaded ? (
          <>
            <ProfileDev>
              <ImageDiv>
                <img src={userInfo.picture}></img>
              </ImageDiv>
              <Info>
                <h4>Name:</h4>
                <NameText>{userInfo.nickname}</NameText>
                <hr />
                <h4>Email:</h4>
                <NameText>{userInfo.email}</NameText>
              </Info>
            </ProfileDev>
            <HistoryDiv>
              <Topic>
                <h3>Your activity</h3>
                <ArrowButton onClick={handleHistory}>
                  <AiOutlineDown className={historyOpen ? "up" : "down"} />
                </ArrowButton>
              </Topic>
              <Content className={historyOpen ? "show" : "content"}>
                <CreatedText>Account created </CreatedText>
                <DateText>{moment(userInfo.joined).format("lll")}</DateText>
                <CreatedText>Last Login </CreatedText>
                <DateText>{moment(userInfo.lastLogIn).format("lll")}</DateText>
              </Content>
            </HistoryDiv>
            <DeleteDev>
              <Topic>
                <h3>Account</h3>
                <ArrowButton onClick={handleAccount}>
                  <AiOutlineDown className={accountOpen ? "up" : "down"} />
                </ArrowButton>
              </Topic>
              <Content className={accountOpen ? "show" : "content"}>
                <DangerText>Danger</DangerText>
                <p>
                  Warning this will permanantly delete your account. If you
                  choose to delete, your account will be lost forever!
                </p>
                <DeleteButton onClick={handleDeleteAccount}>
                  <BiTrash />
                  Delete Account
                </DeleteButton>
              </Content>
            </DeleteDev>
          </>
        ) : (
          <Spinner />
        )
      ) : (
        <Error />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: white;
  padding: 120px 60px 0px 60px;
  height: 100vh;
  background-color: #131d29;
  margin-left: 270px;
  margin-right: 270px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .show {
    height: 130px;
  }
  .down {
    transform: rotate(0deg);
    transition: transform 0.3s ease-in-out;
  }
  .up {
    transform: rotate(180deg);
    transition: transform 0.3s ease-in-out;
  }
`;
const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  margin-top: 10px;
  border-radius: 4px;
  width: 135px;
  padding: 3px 2px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
`;

const DangerText = styled.h3`
  color: #f44336;
  margin-top: 15px;
`;
const CreatedText = styled.h4`
  margin-top: 10px;
`;
const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  color: white;
  cursor: pointer;
`;
const DateText = styled.span`
  color: lightgrey;
`;
const Content = styled.div`
  height: 0px;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;
const NameText = styled.span`
  color: lightgrey;
`;

const ProfileDev = styled.div`
  background-color: #010206;
  border-radius: 6px;
  width: 100%;
  height: 250px;
  padding: 50px;
  display: flex;
  img {
    border-radius: 2px;
    min-width: 130px;
    max-width: 130px;
    margin-right: 50px;
  }
`;
const ImageDiv = styled.div``;
const Info = styled.div`
  hr {
    border: 1px solid grey;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
const HistoryDiv = styled.div`
  background-color: #010206;
  border-radius: 6px;
  width: 100%;
  height: auto;
  margin: 60px 0px 5px 0px;
  padding: 10px;
`;
const DeleteDev = styled.div`
  background-color: #010206;
  border-radius: 6px;
  height: auto;
  width: 100%;
  padding: 10px;
`;
const Topic = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default ProfilePage;
