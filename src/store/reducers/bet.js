import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  bets: [],
  bet: {},
  errors: {},
  edited: false,
  navigation: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BET_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.BET_OPEN_SUCCESS:
      return {
        ...state,
        loading: false,
        bets: action.data.matches,
        navigation: {
          currentPage: action.data.currentPage,
          hasNextPage: action.data.hasNextPage,
          hasPrevPage: action.data.hasPrevPage,
          nextPage: action.data.nextPage,
          previousPage: action.data.previousPage,
          lastPage: action.data.lastPage
        },
        errors: {},
        bet: {},
        edited: false
      };
    case actionTypes.BET_OPEN_FAILED:
      return {
        ...state,
        loading: false,
        errors: action.errors
      };
    case actionTypes.BET_ADD_SUCCESS:
      const oldBets = [...state.bets].filter(bet => bet._id !== action.bet._id);
      return {
        ...state,
        loading: false,
        bets: oldBets.concat(action.bet),
        errors: {},
        edited: true
      };
    case actionTypes.BET_ADD_FAILED:
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
