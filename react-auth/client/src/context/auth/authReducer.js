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
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      localStorage.setItem('user', action.payload._id);
      localStorage.setItem('name', action.payload.name);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case VERIFY_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: null,
        loading: false,
        user: null,
        error: action.payload,
      };
    
    case LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('name');
      return {
        ...state,
        isAuthenticated: null,
        user: null,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
