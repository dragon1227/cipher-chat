import React from "react";
import styled from "styled-components";

const Nav = styled.div`
  position: relative;
  left: -50%;
  background: #e8e8e8;
  padding: 0px 5px 2px 5px;
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
  font-size: 16px;

  i {
    cursor: pointer;
  }

  @media only screen and (max-width: 600px) {
    font-size: 20px;
  }
`;

const NavButton = styled.i`
  cursor: pointer;

  &:hover {
    color: #1e1e1e;
  }

  color: ${({ active }) => {
    if (!active) return `#7e7e7e;`;
    else return `#1e1e1e`;
  }};
`;

const NavBar = ({
  history,
  location,
  setChannel,
  privChannel,
  setPrivChannel,
  navOpen,
  flipOpenNav
}) => {
  let preview = "~";
  switch (location.pathname) {
    case "/chat/ch/global":
      preview = "Global";
      break;
    case "/chat/search":
      preview = "Online Users";
      break;
    default:
      preview = privChannel;
      break;
  }

  function handleNavButtonClick() {
    flipOpenNav(false);
    setPrivChannel("");
  }

  return (
    <div style={{ position: "absolute", left: "50%" }}>
      <Nav>
        {!navOpen ? (
          <b>{preview}</b>
        ) : (
          <React.Fragment>
            <NavButton className="fas fa-envelope" />{" "}
            <NavButton
              active={location.pathname === "/chat/ch/global"}
              onClick={() => {
                handleNavButtonClick();
                setChannel("global");
                history.push("/chat/ch/global");
              }}
              className="fas fa-globe"
            />{" "}
            <NavButton
              active={location.pathname === "/chat/search"}
              className="fas fa-search"
              onClick={() => {
                handleNavButtonClick();
                history.push("/chat/search");
              }}
            />
          </React.Fragment>
        )}
      </Nav>
    </div>
  );
};

export default NavBar;
