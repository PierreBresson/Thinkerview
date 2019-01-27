import {
  FETCHING_INTERVIEWS,
  FETCHING_INTERVIEWS_SUCCESS,
  FETCHING_INTERVIEWS_ERROR,
  FETCHING_INTERVIEWS_RESET,
  FETCHING_INTERVIEWS_LAST_PAGE,
  INTERVIEWS_SCROLL_TO_TOP
} from "../actions/types";

const initialState = {
  isFetchingInterviews: false,
  errorFetchingInterviews: false,
  data: null,
  page: 1,
  lastPage: false,
  shouldScrollToTop: false
};

export default (interviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_INTERVIEWS:
      return {
        ...state,
        isFetchingInterviews: true,
        errorFetchingInterviews: false
      };
    case FETCHING_INTERVIEWS_SUCCESS:
      if (state.page === 1) {
        return {
          ...state,
          page: state.page + 1,
          data: action.interviews,
          isFetchingInterviews: false,
          errorFetchingInterviews: false
        };
      } else {
        return {
          ...state,
          page: state.page + 1,
          data: [...state.data, ...action.interviews],
          isFetchingInterviews: false,
          errorFetchingInterviews: false
        };
      }
    case FETCHING_INTERVIEWS_ERROR:
      return {
        ...state,
        ...initialState,
        isFetchingInterviews: false,
        errorFetchingInterviews: true
      };
    case FETCHING_INTERVIEWS_RESET:
      return {
        ...state,
        ...initialState
      };
    case FETCHING_INTERVIEWS_LAST_PAGE:
      return {
        ...state,
        lastPage: true,
        isFetchingInterviews: false,
        errorFetchingInterviews: false
      };
    case INTERVIEWS_SCROLL_TO_TOP:
      return {
        ...state,
        shouldScrollToTop: !state.shouldScrollToTop
      };
    default:
      return state;
  }
});
