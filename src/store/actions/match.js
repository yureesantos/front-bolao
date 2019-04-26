import * as actionTypes from "./actionTypes";

import axios from "axios";
import { decode } from "qss";

// MATCH SELECTION
export const matchOpen = data => {
  return dispatch => {
    let searchParams = decode(data.substring(1));
    let page = searchParams.page;
    let maxItems = searchParams.maxItems;
    dispatch(matchLoading());
    axios
      .get(
        `${process.env.REACT_APP_URL_START}/matches`,

        {
          params: {
            page: page,
            maxItems: maxItems
          }
        }
      )
      .then(matches => {
        dispatch(matchOpenSuccess(matches.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(matchOpenFailed(err.response));
      });
  };
};

export const matchLoading = matches => {
  return {
    type: actionTypes.MATCH_LOADING,
    data: matches
  };
};

export const matchOpenSuccess = matches => {
  return {
    type: actionTypes.MATCH_OPEN_SUCCESS,
    data: matches
  };
};

export const matchOpenFailed = errors => {
  return {
    type: actionTypes.MATCH_OPEN_FAILED,
    errors: errors
  };
};

// MATCH ADD
export const matchAdd = matchData => {
  return dispatch => {
    dispatch(matchLoading());
    axios
      .post(`${process.env.REACT_APP_URL_START}/matches/add-match`, matchData)
      .then(msg => {
        dispatch(matchAddSuccess(msg.data));
      })
      .catch(err => {
        dispatch(matchAddFailed(err.response.data));
      });
  };
};

export const matchAddSuccess = msg => {
  return {
    type: actionTypes.MATCH_ADD_SUCCESS,
    msg: msg
  };
};

export const matchAddFailed = errors => {
  return {
    type: actionTypes.MATCH_ADD_FAILED,
    errors: errors
  };
};

// MATCH EDIT
export const matchEditOpen = matchID => {
  return dispatch => {
    dispatch(matchLoading());
    axios
      .get(`${process.env.REACT_APP_URL_START}/matches/edit-match/${matchID}`)
      .then(match => {
        dispatch(matchEditOpenSuccess(match.data));
      })
      .catch(err => {
        dispatch(matchEditOpenFailed(err.response));
      });
  };
};

export const matchEditOpenSuccess = partida => {
  return {
    type: actionTypes.MATCH_EDIT_OPEN_SUCCESS,
    partida: partida
  };
};

export const matchEditOpenFailed = errors => {
  return {
    type: actionTypes.MATCH_EDIT_OPEN_FAILED,
    errors: errors
  };
};

export const matchEditSave = matchData => {
  return dispatch => {
    dispatch(matchLoading());
    axios
      .post(`${process.env.REACT_APP_URL_START}/matches/add-match`, matchData)
      .then(match => {
        console.log("oi");
        dispatch(matchEditSaveSuccess(match.data));
      })
      .catch(err => {
        dispatch(matchEditSaveFailed(err.response.data));
      });
  };
};

export const matchEditSaveSuccess = partida => {
  return {
    type: actionTypes.MATCH_EDIT_SAVE_SUCCESS,
    partida: partida
  };
};

export const matchEditSaveFailed = errors => {
  return {
    type: actionTypes.MATCH_EDIT_SAVE_FAILED,
    loading: false,
    errors: errors
  };
};
// TODO Colocar volta de erros da API
// MATCH DELETE
export const matchDel = match => {
  return dispatch => {
    dispatch(matchLoading());
    axios
      .put(
        `${process.env.REACT_APP_URL_START}/matches/del-match/${match}`,
        match
      )
      .then(success => {
        dispatch(matchDelSuccess(success.data.msg, success.data.matchID));
      })
      .catch(err => {
        dispatch(matchDelFailed(err.response));
      });
  };
};

export const matchDelSuccess = (msg, matchID) => {
  return {
    type: actionTypes.MATCH_DEL_SUCCESS,
    msg: msg,
    match: matchID
  };
};

export const matchDelFailed = errors => {
  return {
    type: actionTypes.MATCH_DEL_FAILED,
    errors: errors
  };
};

// MATCH FINISH
export const matchFin = match => {
  return dispatch => {
    dispatch(matchLoading());
    axios
      .put(`${process.env.REACT_APP_URL_START}/bets/fin-match/${match}`, match)
      .then(match => {
        dispatch(matchFinSuccess(match.data._id));
      })
      .catch(err => {
        dispatch(matchFinFailed(err.response.data));
      });
  };
};

export const matchFinSuccess = matchID => {
  return {
    type: actionTypes.MATCH_FIN_SUCCESS,
    match: matchID
  };
};

export const matchFinFailed = errors => {
  return {
    type: actionTypes.MATCH_FIN_FAILED,
    errors: errors
  };
};

// MATCH ERASE

export const eraseMatch = () => {
  return {
    type: actionTypes.ERASE_MATCH
  };
};
