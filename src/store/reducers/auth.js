import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  authenticated: false,
  loading: false,
  error: null
};

const authStart = (state, action) => {
  return updateObject(state, {
    authenticated: false,
    loading: true,
    error: null
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    authenticated: false,
    loading: false,
    error: action.error
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    authenticated: true,
    loading: false,
    error: null
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    authenticated: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
