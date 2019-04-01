import {
  FETCHING_INTERVIEWS,
  FETCHING_INTERVIEWS_SUCCESS,
  FETCHING_INTERVIEWS_ERROR,
  FETCHING_INTERVIEWS_RESET,
  FETCHING_INTERVIEWS_LAST_PAGE,
  INTERVIEWS_SCROLL_TO_TOP
} from "./types";
import { pathOr } from "ramda";
import getInterviews from "../services/api/getInterviews";

export const gettingInterviews = () => {
  return {
    type: FETCHING_INTERVIEWS
  };
};

export const gettingInterviewsSuccess = interviews => {
  return {
    type: FETCHING_INTERVIEWS_SUCCESS,
    interviews
  };
};

export const gettingInterviewsFailure = () => {
  return {
    type: FETCHING_INTERVIEWS_ERROR
  };
};

export const interviewsFetcher = (category_id = 0) => {
  return (dispatch, getState) => {
    let shouldFetch = !getState().interviews.lastPage;

    if (shouldFetch) {
      dispatch(gettingInterviews());
      getInterviews(getState().interviews.page, category_id)
        .then(res => {
          return dispatch(gettingInterviewsSuccess(res));
        })
        .catch((error = {}) => {
          const status = pathOr(0, ["response", "status"], error);

          if (status === 400) {
            return dispatch(setLastPageInterviews());
          } else {
            return dispatch(gettingInterviewsFailure());
          }
        });
    }
  };
};

export const resetInterviewsFetcher = () => {
  return {
    type: FETCHING_INTERVIEWS_RESET
  };
};

export const setLastPageInterviews = () => {
  return {
    type: FETCHING_INTERVIEWS_LAST_PAGE
  };
};

export const interviewsScrollToTop = () => {
  return {
    type: INTERVIEWS_SCROLL_TO_TOP
  };
};
