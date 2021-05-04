import React, { useState, useContext} from 'react';
import styled from "styled-components";
import breakpoint, { map } from "styled-components-breakpoint";
import { useAlert } from "react-alert";
import AuthContext from '../../context/auth/authContext';
import { Redirect } from "react-router-dom";
import passwordValidator from 'password-validator';


const Wrapper = styled.div`
  height: 100%;
`;

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  font-size: 3rem;
  font-family: "Lato", sans-serif;
`;

const StyledHeading = styled.h2`
  color: #60adf0;
  margin-bottom: 1rem;
`; 

StyledHeading.displayName = 'StyledHeading';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
`;

const StyledLabel = styled.label`
  font-size: 1.5rem;
  color: #22afe3;
  margin-bottom: 0.7rem;
  font-weight: 700;
`;

const StyledInput = styled.input`
  height: 2rem;
  font-size: 1.3rem;
  padding: 0.5rem;
  width: 18rem;
  border: 2px solid #22afe3;
  border-radius: 5px;
  background-color: #e8f9ff;
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  ${breakpoint("md")`
    margin-top: 2rem
    `}
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




const Register = () => {


  const alert = useAlert();
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    password2: ''
  });

  const onChange = e => setUser({ ...user, [e.target.name] : e.target.value });

  const { name, email, mobile, password, password2 } = user;

  const onSubmit = e => {
    e.preventDefault();
    console.log(mobile);
    
    if (name === "" || email === "" || password === "" || password2 === "" || mobile === "") {
      
      if (name === '') {
         alert.error('Please fill out name');
      }
      if (email === '') {
         alert.error('Please fill out email');
      }
      if (mobile === '') {
         alert.error('Please fill out mobile');
      }
      if (password === '') {
         alert.error('Please fill out password');
      }
      return alert.error("Please fill out all fields");
    }
    if (error !== null) {
      return alert.error("Please enter accurate personal information");
    }
    var schema = new passwordValidator();
 
    // Add properties to it
    schema
      .is().min(6)                                    // Minimum length 8
      .is().max(100)                                  // Maximum length 100
      .has().uppercase()                              // Must have uppercase letters
      .has().lowercase()                              // Must have lowercase letters
      .has().digits()
      .has().symbols()
      .has().not().spaces();

    if (!schema.validate(password)) {
      return alert.error('Please include uppercase , lowercase, digits and symbol characters');
      setUser({
        password: '',
        password2: ''
      })
    }

    if (password !== password2) {
      return alert.error('Your password is not correct');
    } else {
      alert.success('User created successfully!')
      window.location.reload();
      setUser({
        name: '',
        email: '',
        mobile: '',
        password: '',
        password2: ''
      })
        register({
          name,
          email,
          mobile,
          password
        });
    }
  };

  return (
    <Wrapper>
      <RegisterWrapper>
        {isAuthenticated && <Redirect to="/" />}
        <StyledHeading id="styledHeading">Sign Up</StyledHeading>

        <form onSubmit={onSubmit}>
          <StyledDiv>
            <StyledLabel htmlFor="name">Name</StyledLabel>
            <StyledInput
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </StyledDiv>
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
            <StyledLabel htmlFor="email">Mobile</StyledLabel>
            <StyledInput
              type="text"
              id="mobile"
              name="mobile"
              value={mobile}
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
          <StyledDiv>
            <StyledLabel htmlFor="password2">Password Confirmation</StyledLabel>
            <StyledInput
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
            />
          </StyledDiv>
          <SubmitWrapper>
            <StyledSubmitInput type="submit" id="submitButton">Submit</StyledSubmitInput>
          </SubmitWrapper>
        </form>
      </RegisterWrapper>
    </Wrapper>
  );
};

export default Register
