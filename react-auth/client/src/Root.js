import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

import AuthContext from "./context/auth/authContext";

export const Root = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, verifyLocalStorage } = authContext;

  useEffect(() => {
    if(!isAuthenticated && localStorage.token) {
    console.log("Checking if user is already authenticated");
    verifyLocalStorage({user: localStorage.user});
    }
  });


  return (
    <Router>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/"><Home /></PrivateRoute>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default Root;