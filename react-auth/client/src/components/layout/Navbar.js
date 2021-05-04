import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import breakpoint, { map } from "styled-components-breakpoint";

import AuthContext from "../../context/auth/authContext";

const NavContainer = styled.div`
top: 0;
position: sticky;
  width: 100%;
  grid-area: navbar;
`;

const Nav = styled.nav`
  background-color: #60adf0;
  height: 100%;
  display: flex;
  justify-content: center;
  ${breakpoint("md")`
    justify-content: flex-end;
    `}
`;

const LoggedInNav = styled.nav`
  height: 100%;
  background-color: #60adf0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  ${breakpoint("md")`
    justify-content: flex-end;
    `}
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  justify-content: center;
  font-family: "Lato", sans-serif;
  ${breakpoint("md")`
    justify-content: flex-end;
    margin-top: 1.5rem;
    `}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 1.5rem;
  ${breakpoint("md")`
    height: 3.5rem;
    margin-right: 3rem;
    `}
`;

const StyledLogout = styled(Link)`
  text-decoration: none;
  font-size: 3rem;
  color: white;
  padding: 1.5rem;
  justify-self: flex-start;

  ${breakpoint("md")`
    height: 3.5rem;
    margin-right: 3rem;
    `}
`;

StyledLogout.displayName = 'StyledLogout';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  return (
    <>
      {isAuthenticated ? (
        <NavContainer>
          <LoggedInNav>
            <List>
              <StyledLogout onClick={() => logout()}>
                <i class="fas fa-sign-out-alt"></i>
              </StyledLogout>
            </List>
          </LoggedInNav>
        </NavContainer>
      ) : (
        <NavContainer>
          <Nav>
            <List>
              <StyledLink to="/login">Login</StyledLink>
              <StyledLink to="/register">Register</StyledLink>
            </List>
          </Nav>
        </NavContainer>
      )}
    </>
  );
}

export default Navbar
