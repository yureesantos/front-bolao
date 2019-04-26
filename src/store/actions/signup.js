import * as actionTypes from "./actionTypes";
import axios from "axios";

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  };
};

export const singupSuccess = msg => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    msg: msg
  };
};

export const singupFailed = errors => {
  return {
    type: actionTypes.SIGNUP_FAILED,
    errors: errors
  };
};

export const singup = newUser => {
  return dispatch => {
    dispatch(signupStart());
    axios
      .post(`${process.env.REACT_APP_URL_START}/auth/signup`, newUser)
      .then(response => {
        dispatch(singupSuccess(response.data));
      })
      .catch(err => {
        dispatch(singupFailed(err.response.data));
      });
  };
};
