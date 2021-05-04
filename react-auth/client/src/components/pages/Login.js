import React, { useState, useContext, useEffect } from "react";
import { useAlert } from "react-alert";
import { Redirect } from "react-router-dom";
import styled from 'styled-components';
import breakpoint, { map } from "styled-components-breakpoint";
import avatars from '../../utils/avatars.js'

import axios from 'axios';

import AuthContext from '../../context/auth/authContext';

const Wrapper = styled.div`
  height: 100%;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  font-size: 3rem;
  font-family: "Lato", sans-serif;
  padding-top: 2.5rem;
`;

const ImgWrapper = styled.div`
  border: 3px solid #22afe3;
  border-radius: 50%;
  background-color: #e8f9ff;
`;

const Image = styled.img`
  height: 5rem;
  padding: 2rem;
  ${breakpoint("xs")`
    height: 3.5rem;
    `}
  ${breakpoint("md")`
    height: 7rem;
    `}
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  ${breakpoint("md")`
    padding: 1.5rem;
    `}
`;

const StyledLabel = styled.label`
  font-size: 1.8rem;
  width: 3rem;
  color: #22afe3;
  margin-bottom: 0.7rem;
  font-weight: 700;
`;

const StyledInput = styled.input`
  height: 2rem;
  width: 18rem;
  font-size: 1.3rem;
  padding: 0.5rem;
  border: 2px solid #22afe3;
  border-radius: 5px;
  background-color: #e8f9ff;
  ${breakpoint("xs")`
    height: 2rem;
    `}
  ${breakpoint("md")`
    height: 3rem;
    `}
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSubmitInput = styled.button`
  width: 12rem;
  font-size: 2rem;
  background-color: #60adf0;
  border-radius: 7px;
  border: 2px solid #22afe3;
  color: #ffffff;
  padding: 0.5rem;
`;

const CreditWrapper = styled.div`
  text-decoration: none;
  text-align: center;
  line-height: 1.5rem;
  font-size: 1rem;
  color: #22afe3;
  font-style: italic;
  margin-top: 0rem;
  padding: 2rem;
  ${breakpoint("md")`
    margin-top: 3.5rem;
    height: 3.5rem;
    padding: 0;
    `}
`;

const CreditLink = styled.a`
  text-decoration: none;
  color: #22afe3;
  font-weight: 700;
`;

CreditLink.displayName = 'CreditLink';


let randomInt = Math.floor(Math.random() * avatars.length);
const randomAvatar = avatars[randomInt];

const Login = () => {
  const alert = useAlert();

  const authContext = useContext(AuthContext);
  const { login, verifyLocalStorage, isAuthenticated, error, clearErrors } = authContext;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = e => setUser({...user, [e.target.name] : e.target.value });

  const onSubmit = e => {
    e.preventDefault();


    if (email === "" || password === "") {
      return alert.error("Please enter your email or password!");
    }

    const valid = login({
      email,
      password
    });

    verifyLocalStorage({
      email,
      password
    })
      window.location.replace('http://10.10.11.130:5001')
    // window.location.replace('http://localhost:8090')
  };

  // if (error !== null) {
  //   // alert.error("Your email or password is incorrect");
  //   // alert.error(error)
  //   // clearErrors();
  // }

  return (
    <Wrapper>
      <LoginWrapper>
        {isAuthenticated && <Redirect to="/" />}
        <ImgWrapper>
          <Image src={randomAvatar} id='avatar'/>
        </ImgWrapper>
        <form onSubmit={onSubmit}>
          <StyledDiv>
            <StyledLabel htmlFor="email">Email</StyledLabel>
            <StyledInput
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </StyledDiv>
          <StyledDiv>
            <StyledLabel htmlFor="password">Password</StyledLabel>
            <StyledInput
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </StyledDiv>
          <SubmitWrapper>
            <StyledSubmitInput id="submitButton" type="submit">Log in</StyledSubmitInput>
          </SubmitWrapper>
        </form>
        <CreditWrapper>
          Icons made by{" "}
          <CreditLink
            href="https://www.flaticon.com/authors/darius-dan"
            title="Darius Dan"
          >
            Darius Dan
          </CreditLink>{" "}
          from{" "}<br/>
          <CreditLink href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </CreditLink>
        </CreditWrapper>
      </LoginWrapper>
    </Wrapper>
  );
}

export default Login;
