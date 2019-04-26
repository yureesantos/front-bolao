import * as actionTypes from "./actionTypes";

import axios from "axios";
import { decode } from "qss";

// COUNTRY SELECTION
export const countryOpen = data => {
  return dispatch => {
    let searchParams = decode(data.substring(1));
    let page = searchParams.page;
    let maxItems = searchParams.maxItems;

    dispatch(countryLoading());
    axios
      .get(`${process.env.REACT_APP_URL_START}/countries/`, {
        params: {
          page: page,
          maxItems: maxItems
        }
      })
      .then(countries => {
        dispatch(countryOpenSuccess(countries.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(countryOpenFailed(err.response));
      });
  };
};

export const countryLoading = countries => {
  return {
    type: actionTypes.COUNTRY_LOADING,
    data: countries
  };
};

export const countryOpenSuccess = countries => {
  return {
    type: actionTypes.COUNTRY_OPEN_SUCCESS,
    data: countries
  };
};

export const countryOpenFailed = errors => {
  return {
    type: actionTypes.COUNTRY_OPEN_FAILED,
    errors: errors
  };
};

// COUNTRY ADD
export const countryAdd = countryData => {
  return dispatch => {
    dispatch(countryLoading());
    axios
      .post(
        `${process.env.REACT_APP_URL_START}/countries/add-country`,
        countryData
      )
      .then(msg => {
        dispatch(countryAddSuccess(msg.data));
      })
      .catch(err => {
        dispatch(countryAddFailed(err.response.data));
      });
  };
};

export const countryAddSuccess = msg => {
  return {
    type: actionTypes.COUNTRY_ADD_SUCCESS,
    msg: msg
  };
};

export const countryAddFailed = errors => {
  return {
    type: actionTypes.COUNTRY_ADD_FAILED,
    errors: errors
  };
};

// COUNTRY EDIT
export const countryEditOpen = countryID => {
  return dispatch => {
    dispatch(countryLoading());
    axios
      .get(
        `${process.env.REACT_APP_URL_START}/countries/edit-country/${countryID}`
      )
      .then(country => {
        dispatch(countryEditOpenSuccess(country.data));
      })
      .catch(err => {
        dispatch(countryEditOpenFailed(err.response.data));
      });
  };
};

export const countryEditOpenSuccess = country => {
  return {
    type: actionTypes.COUNTRY_EDIT_OPEN_SUCCESS,
    country: country
  };
};

export const countryEditOpenFailed = errors => {
  return {
    type: actionTypes.COUNTRY_EDIT_OPEN_FAILED,
    errors: errors
  };
};

export const countryEditSave = countryData => {
  return dispatch => {
    dispatch(countryLoading());
    axios
      .post(
        `${process.env.REACT_APP_URL_START}/countries/add-country`,
        countryData
      )
      .then(country => {
        dispatch(countryEditSaveSuccess(country.data));
      })
      .catch(err => {
        dispatch(countryEditSaveFailed(err.response.data));
      });
  };
};

export const countryEditSaveSuccess = country => {
  return {
    type: actionTypes.COUNTRY_EDIT_SAVE_SUCCESS,
    country: country
  };
};

export const countryEditSaveFailed = errors => {
  return {
    type: actionTypes.COUNTRY_EDIT_SAVE_FAILED,
    loading: false,
    errors: errors
  };
};

// COUNTRY DELETE
export const countryDel = country => {
  return dispatch => {
    dispatch(countryLoading());
    axios
      .put(
        `${process.env.REACT_APP_URL_START}/countries/del-country/${country}`,
        country
      )
      .then(success => {
        dispatch(countryDelSuccess(success.data.msg, success.data.countryID));
      })
      .catch(err => {
        dispatch(countryDelFailed(err.response.data));
      });
  };
};

export const countryDelSuccess = (msg, countryID) => {
  return {
    type: actionTypes.COUNTRY_DEL_SUCCESS,
    msg: msg,
    country: countryID
  };
};

export const countryDelFailed = errors => {
  return {
    type: actionTypes.COUNTRY_DEL_FAILED,
    errors: errors
  };
};

// COUNTRY ERASE
export const eraseCountry = () => {
  return {
    type: actionTypes.ERASE_COUNTRY
  };
};
