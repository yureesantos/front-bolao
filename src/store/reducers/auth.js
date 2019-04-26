import isEmpty from "../../validation/is-empty";
import setAuthToken from "../../util/setAuthToken";

import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  token: {},
  currentUser: {},
  loading: false,
  errors: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        errors: {},
        loading: true
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.data),
        currentUser: action.data,
        errors: {},
        loading: false
      };

    case actionTypes.LOGIN_FAILED:
      localStorage.removeItem("jwtToken");
      return {
        ...state,
        isAuthenticated: false,
        errors: action.errors,
        loading: false
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      return {
        ...state,
        isAuthenticated: false,
        token: {},
        currentUser: {},
        errors: {}
      };
    default:
      return state;
  }
};

export default reducer;
