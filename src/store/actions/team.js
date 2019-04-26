import * as actionTypes from "./actionTypes";

import axios from "axios";
import { decode } from "qss";

// TEAM SELECTION
export const teamOpen = data => {
  return dispatch => {
    let searchParams = decode(data.substring(1));
    let page = searchParams.page;
    let maxItems = searchParams.maxItems;
    dispatch(teamLoading());
    axios
      .get(
        `${process.env.REACT_APP_URL_START}/teams`,

        {
          params: {
            page: page,
            maxItems: maxItems
          }
        }
      )
      .then(teams => {
        dispatch(teamOpenSuccess(teams.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(teamOpenFailed(err.response));
      });
  };
};

export const teamLoading = teams => {
  return {
    type: actionTypes.TEAM_LOADING,
    data: teams
  };
};

export const teamOpenSuccess = teams => {
  return {
    type: actionTypes.TEAM_OPEN_SUCCESS,
    data: teams
  };
};

export const teamOpenFailed = errors => {
  return {
    type: actionTypes.TEAM_OPEN_FAILED,
    errors: errors
  };
};

// COUNTRY ADD
export const teamAdd = teamData => {
  return dispatch => {
    dispatch(teamLoading());
    axios
      .post(`${process.env.REACT_APP_URL_START}/teams/add-team`, teamData)
      .then(msg => {
        dispatch(teamAddSuccess(msg.data));
      })
      .catch(err => {
        dispatch(teamAddFailed(err.response.data));
      });
  };
};

export const teamAddSuccess = msg => {
  return {
    type: actionTypes.TEAM_ADD_SUCCESS,
    msg: msg
  };
};

export const teamAddFailed = errors => {
  return {
    type: actionTypes.TEAM_ADD_FAILED,
    errors: errors
  };
};

// TEAM EDIT
export const teamEditOpen = teamID => {
  return dispatch => {
    dispatch(teamLoading());
    axios
      .get(`${process.env.REACT_APP_URL_START}/teams/edit-team/${teamID}`)
      .then(team => {
        dispatch(teamEditOpenSuccess(team.data));
      })
      .catch(err => {
        dispatch(teamEditOpenFailed(err.response));
      });
  };
};

export const teamEditOpenSuccess = team => {
  return {
    type: actionTypes.TEAM_EDIT_OPEN_SUCCESS,
    team: team
  };
};

export const teamEditOpenFailed = errors => {
  return {
    type: actionTypes.TEAM_EDIT_OPEN_FAILED,
    errors: errors
  };
};

export const teamEditSave = teamData => {
  return dispatch => {
    dispatch(teamLoading());
    axios
      .post(`${process.env.REACT_APP_URL_START}/teams/add-team`, teamData)
      .then(team => {
        dispatch(teamEditSaveSuccess(team.data));
      })
      .catch(err => {
        dispatch(teamEditSaveFailed(err.response.data));
      });
  };
};

export const teamEditSaveSuccess = team => {
  return {
    type: actionTypes.TEAM_EDIT_SAVE_SUCCESS,
    team: team
  };
};

export const teamEditSaveFailed = errors => {
  return {
    type: actionTypes.TEAM_EDIT_SAVE_FAILED,
    loading: false,
    errors: errors
  };
};

// TEAM DELETE
export const teamDel = team => {
  return dispatch => {
    dispatch(teamLoading());
    axios
      .put(`${process.env.REACT_APP_URL_START}/teams/del-team/${team}`, team)
      .then(success => {
        dispatch(teamDelSuccess(success.data.msg, success.data.teamID));
      })
      .catch(err => {
        dispatch(teamDelFailed(err.response));
      });
  };
};

export const teamDelSuccess = (msg, teamID) => {
  return {
    type: actionTypes.TEAM_DEL_SUCCESS,
    msg: msg,
    team: teamID
  };
};

export const teamDelFailed = errors => {
  return {
    type: actionTypes.TEAM_DEL_FAILED,
    errors: errors
  };
};

// TEAM ERASE

export const eraseTeam = () => {
  return {
    type: actionTypes.ERASE_TEAM
  };
};
