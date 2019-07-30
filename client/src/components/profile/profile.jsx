import React, { useState } from "react";
import Title from "../forms/title";
import styled from "styled-components";
import Bio from "./bio";

const Container = styled.div`
  color: white;
  margin-bottom: 3px;

  a {
    color: white !important;
  }

  span {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;

  div {
    font-size: 12px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    @media only screen and (max-width: 600px) {
      font-size: 16px;
    }
  }

  #status {
    text-align: left !important;
  }

  #logout {
    text-align: right !important;
  }
`;

const Profile = ({ user, onUpdateBio, socket }) => {
  const [isOnline, setIsOnline] = useState(true);

  const handleLogout = () => {
    localStorage.clear();

    window.location = "/";
  };

  const status = isOnline ? "Online" : "Offline";

  function handleStatusChange() {
    setIsOnline(!isOnline);
    if (isOnline) socket.emit("user-offline");
    else socket.emit("new-user", user);
  }

  return (
    <Container>
      <Title
        title={user.username}
        body={<Bio bio={user.bio} onSave={onUpdateBio} />}
      />

      <Grid>
        <div onClick={handleStatusChange} id="status">
          <i className="fas fa-circle" /> {status}
        </div>

        <div id="center">
          <i className="fas fa-search" /> <i className="fas fa-globe" />{" "}
          <i className="fas fa-user" /> <i className="fas fa-envelope" />
        </div>

        <div onClick={handleLogout} id="logout">
          Logout <i className="fas fa-times-circle" />
        </div>
      </Grid>
    </Container>
  );
};

export default Profile;
