import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    accessToken: token,
    username: username,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('username');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      username: email,
      password: password,
    };
    let url = 'https://rectifier-backend.herokuapp.com/auth/signin';
    if (!isSignup) {
      url = 'https://rectifier-backend.herokuapp.com/auth/signin';
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(response.data.expirationDate);
        const timeToExpiration = expirationDate - new Date();
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('username', response.data.username);
        dispatch(
          authSuccess(response.data.accessToken, response.data.username)
        );
        dispatch(checkAuthTimeout(timeToExpiration));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const username = localStorage.getItem('username');
        dispatch(authSuccess(token, username));
        dispatch(checkAuthTimeout(expirationDate - new Date()));
      }
    }
  };
};
