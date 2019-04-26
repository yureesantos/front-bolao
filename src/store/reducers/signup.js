import * as actionTypes from "../actions/actionTypes";

const initialState = {
  msg: {},
  loading: false,
  errors: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        errors: {},
        loading: true
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        msg: action.msg,
        loading: false,
        errors: {}
      };
    case actionTypes.SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors
      };
    default:
      return state;
  }
};

export default reducer;
