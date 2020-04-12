import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = data => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: data.idToken,
    userId: data.localId
  };
};

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("localId");
  localStorage.removeItem("expirationTime");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    const url = isSignUp
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBq9c-3Umrh8d8R_tgtSKtF65-eQaUKYaU"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBq9c-3Umrh8d8R_tgtSKtF65-eQaUKYaU";
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("localId", response.data.localId);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(checkAuthTimeout(response.data.expiresIn));
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirect = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const expirationTime = new Date(localStorage.getItem("expirationDate"));
    if (expirationTime <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(
        authSuccess({
          idToken: localStorage.getItem("token"),
          localId: localStorage.getItem("localId")
        })
      );
      dispatch(
        checkAuthTimeout(
          (expirationTime.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  };
};
