import {
  FETCHING_CATEGORY_INTERVIEWS,
  FETCHING_CATEGORY_INTERVIEWS_SUCCESS,
  FETCHING_CATEGORY_INTERVIEWS_ERROR,
  FETCHING_CATEGORY_INTERVIEWS_LAST_PAGE,
  CATEGORY_INTERVIEWS_SCROLL_TO_TOP,
  FETCHING_CATEGORY_INTERVIEWS_RESET
} from "./types";
import { pathOr } from "ramda";
import getInterviews from "../services/api/getInterviews";

export const gettingCategoryInterviews = () => {
  return {
    type: FETCHING_CATEGORY_INTERVIEWS
  };
};

export const gettingCategoryInterviewsSuccess = interviews => {
  return {
    type: FETCHING_CATEGORY_INTERVIEWS_SUCCESS,
    interviews
  };
};

export const gettingCategoryInterviewsFailure = () => {
  return {
    type: FETCHING_CATEGORY_INTERVIEWS_ERROR
  };
};

export const categoryInterviewsFetcher = (category_id = 0) => {
  return (dispatch, getState) => {
    let shouldFetch = !getState().categoryInterviews.lastPage;

    if (shouldFetch) {
      dispatch(gettingCategoryInterviews());
      getInterviews(getState().categoryInterviews.page, category_id)
        .then(res => {
          return dispatch(gettingCategoryInterviewsSuccess(res));
        })
        .catch((error = {}) => {
          const status = pathOr(0, ["response", "status"], error);

          if (status === 400) {
            return dispatch(setLastPageCategoryInterviews());
          } else {
            return dispatch(gettingCategoryInterviewsFailure());
          }
        });
    }
  };
};

export const setLastPageCategoryInterviews = () => {
  return {
    type: FETCHING_CATEGORY_INTERVIEWS_LAST_PAGE
  };
};

export const categoryInterviewsScrollToTop = () => {
  return {
    type: CATEGORY_INTERVIEWS_SCROLL_TO_TOP
  };
};

export const resetCategoryInterviewsFetcher = () => {
  return {
    type: FETCHING_CATEGORY_INTERVIEWS_RESET
  };
};
