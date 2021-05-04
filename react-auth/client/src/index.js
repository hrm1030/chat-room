import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';

import { ThemeProvider } from "styled-components";

const theme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
};
 
const options = {
  timeout: 1500,
  offset: '30px',
  transition: transitions.SCALE
};
 

const Root = () => (
  <ThemeProvider theme={theme}>
    <AlertProvider template={AlertTemplate} {...options} id='alert'>
      <App />
    </AlertProvider>
  </ThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));