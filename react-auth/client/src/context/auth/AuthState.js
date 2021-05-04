import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  VERIFY_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = props => {

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR })
    }
  };

  //Verify Local Storage
  const verifyLocalStorage = async formData => {
    const config = {
      headers: {
      "Content-Type": "application/json"
      }
    };

    try {
      console.log(formData);
      const res = await axios.post("/api/verify", formData, config);
      dispatch({ type: VERIFY_SUCCESS, payload: res.data });
    } catch (err) {
      // dispatch({ type: AUTH_ERROR, payload: err });
      console.log(err)
    }
  }

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
    const res = await axios.post('/api/users', formData, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    };
  };
  // Login User

  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/auth', formData, config)
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      // loadUser();
      console.log('Login successful!');

    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err });
      console.error(err);
    }
  }

  // Logout User
  const logout = () => {
    try {
      dispatch({ type: LOGOUT })
    } catch (err) {
      console.error(err.message);
    }
  }

  // Clear Errors
  const clearErrors = () => {
    try {
      dispatch({ type: CLEAR_ERRORS })
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        loadUser,
        verifyLocalStorage,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
    )
  };

  export default AuthState;