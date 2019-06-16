import {
  FETCHING_CATEGORY_INTERVIEWS,
  FETCHING_CATEGORY_INTERVIEWS_SUCCESS,
  FETCHING_CATEGORY_INTERVIEWS_ERROR,
  FETCHING_CATEGORY_INTERVIEWS_LAST_PAGE,
  FETCHING_CATEGORY_INTERVIEWS_RESET,
  CATEGORY_INTERVIEWS_SCROLL_TO_TOP
} from "../actions/types";

const initialState = {
  isFetchingCategoryInterviews: false,
  errorFetchingCategoryInterviews: false,
  data: null,
  page: 1,
  lastPage: false,
  shouldScrollToTop: false
};

export default (categoryInterviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_CATEGORY_INTERVIEWS:
      return {
        ...state,
        isFetchingCategoryInterviews: true,
        errorFetchingCategoryInterviews: false
      };
    case FETCHING_CATEGORY_INTERVIEWS_SUCCESS:
      if (state.page === 1) {
        return {
          ...state,
          page: state.page + 1,
          data: action.interviews,
          isFetchingCategoryInterviews: false,
          errorFetchingCategoryInterviews: false
        };
      } else {
        return {
          ...state,
          page: state.page + 1,
          data: [...state.data, ...action.interviews],
          isFetchingCategoryInterviews: false,
          errorFetchingCategoryInterviews: false
        };
      }
    case FETCHING_CATEGORY_INTERVIEWS_ERROR:
      return {
        ...state,
        ...initialState,
        isFetchingCategoryInterviews: false,
        errorFetchingCategoryInterviews: true
      };
    case FETCHING_CATEGORY_INTERVIEWS_LAST_PAGE:
      return {
        ...state,
        lastPage: true,
        isFetchingCategoryInterviews: false,
        errorFetchingCategoryInterviews: false
      };
    case CATEGORY_INTERVIEWS_SCROLL_TO_TOP:
      return {
        ...state,
        shouldScrollToTop: !state.shouldScrollToTop
      };
    case FETCHING_CATEGORY_INTERVIEWS_RESET:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
});
