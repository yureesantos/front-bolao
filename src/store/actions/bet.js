import * as actionTypes from "./actionTypes";

import axios from "axios";
import { decode } from "qss";

// BET SELECTION
export const betOpen = data => {
  return dispatch => {
    let searchParams = decode(data.substring(1));
    let page = searchParams.page;
    let maxItems = searchParams.maxItems;
    dispatch(betLoading());
    axios
      .get(`${process.env.REACT_APP_URL_START}/matches`, {
        params: {
          page: page,
          maxItems: maxItems
        }
      })
      .then(bets => {
        dispatch(betOpenSuccess(bets.data));
      })
      .catch(err => {
        dispatch(betOpenFailed(err.response));
      });
  };
};

export const betLoading = bets => {
  return {
    type: actionTypes.BET_LOADING,
    data: bets
  };
};

export const betOpenSuccess = bets => {
  return {
    type: actionTypes.BET_OPEN_SUCCESS,
    data: bets
  };
};

export const betOpenFailed = errors => {
  return {
    type: actionTypes.BET_OPEN_FAILED,
    errors: errors
  };
};

// BET ADD
export const betAdd = betData => {
  return dispatch => {
    dispatch(betLoading());
    axios
      .post(`${process.env.REACT_APP_URL_START}/bets/add-bet`, betData)
      .then(bet => {
        dispatch(betAddSuccess(bet.data));
      })
      .catch(err => {
        dispatch(betAddFailed(err.response.data));
      });
  };
};

export const betAddSuccess = bet => {
  return {
    type: actionTypes.BET_ADD_SUCCESS,
    bet: bet
  };
};

export const betAddFailed = errors => {
  return {
    type: actionTypes.BET_ADD_FAILED,
    errors: errors
  };
};
