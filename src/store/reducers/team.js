import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  teams: [],
  team: {},
  errors: {},
  edited: false,
  navigation: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TEAM_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.TEAM_OPEN_SUCCESS:
      return {
        ...state,
        loading: false,
        teams: action.data.teams,
        navigation: {
          currentPage: action.data.currentPage,
          hasNextPage: action.data.hasNextPage,
          hasPrevPage: action.data.hasPrevPage,
          nextPage: action.data.nextPage,
          previousPage: action.data.previousPage,
          lastPage: action.data.lastPage
        },
        errors: {},
        team: {},
        edited: false
      };
    case actionTypes.TEAM_OPEN_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors
      };
    case actionTypes.TEAM_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        msg: action.msg,
        errors: {},
        edited: true
      };
    case actionTypes.TEAM_ADD_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors
      };
    case actionTypes.TEAM_EDIT_OPEN_SUCCESS:
      return {
        ...state,
        loading: false,
        team: action.team,
        errors: {}
      };
    case actionTypes.TEAM_EDIT_OPEN_FAILED:
      return {
        ...state,
        loading: false,
        team: action.team,
        errors: action.errors
      };
    case actionTypes.TEAM_EDIT_SAVE_SUCCESS:
      const oldTeams = [...state.teams].filter(
        team => team._id !== action.team._id
      );

      return {
        ...state,
        loading: false,
        team: {},
        teams: oldTeams.concat(action.team),
        errors: {},
        edited: true
      };
    case actionTypes.TEAM_EDIT_SAVE_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors,
        edited: false
      };
    case actionTypes.TEAM_DEL_SUCCESS:
      const newteams = [...state.teams].filter(
        team => team._id !== action.team
      );
      return {
        ...state,
        loading: false,
        team: {},
        teams: newteams,
        errors: {}
      };
    case actionTypes.TEAM_DEL_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors,
        edited: false
      };
    case actionTypes.ERASE_TEAM:
      return {
        ...state,
        loading: false,
        countries: [],
        team: {},
        errors: {},
        edited: false,
        navigation: {}
      };

    default:
      return state;
  }
};

export default reducer;
