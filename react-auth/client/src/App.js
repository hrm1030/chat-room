import React from 'react';
// import { BrowserRouter as Router,  Switch, Route } from 'react-router-dom';
import reset from 'styled-reset';
import { createGlobalStyle } from "styled-components";
import breakpoint from "styled-components-breakpoint";

import Root from './Root'

import setAuthToken from './utils/setAuthToken';
import AuthState from './context/auth/AuthState';

const GlobalStyle = createGlobalStyle`
  ${reset};
  /* html, body {
    height: 100%;
    width: 100%;
    position: fixed;
    ${breakpoint('md')`
      position: static
    `} */
  #root {
    min-height: 100vh;
    width: 100%;
    display: grid;
    grid-template-rows: 100px calc(100% - 200px) 100px;
    grid-template-areas: 
      'navbar'  
      'body'
      'footer';
  }
}
`;

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <GlobalStyle />
      <Root />
    </AuthState>
  );
}

export default App;
