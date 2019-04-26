import * as actionTypes from "./actionTypes";
import axios from "axios";
import setAuthToken from "../../util/setAuthToken";
import jwt_decode from "jwt-decode";

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};

export const loginSuccess = data => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    data: data
  };
};

export const loginFailed = errors => {
  return {
    type: actionTypes.LOGIN_FAILED,
    errors: errors
  };
};

export const login = userData => {
  return dispatch => {
    dispatch(loginStart());
    axios
      .post(`${process.env.REACT_APP_URL_START}/auth/login`, userData)
      .then(response => {
        localStorage.setItem("jwtToken", response.data.token);
        setAuthToken(response.data.token);

        const decode = jwt_decode(response.data.token);
        dispatch(loginSuccess(decode));
      })
      .catch(err => {
        dispatch(loginFailed(err.response.data));
      });
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};
