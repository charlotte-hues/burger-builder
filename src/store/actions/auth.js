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
        console.log(response.data);
        dispatch(authSuccess(response.data));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
