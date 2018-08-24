import {
  FETCHING_INTERVIEWS,
  FETCHING_INTERVIEWS_SUCCESS,
  FETCHING_INTERVIEWS_ERROR,
  FETCHING_INTERVIEWS_RESET,
  FETCHING_INTERVIEWS_LAST_PAGE,
  INTERVIEWS_SCROLL_TO_TOP
} from "./types";
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

export const gettingInterviewsFailure = err => {
  return {
    type: FETCHING_INTERVIEWS_ERROR,
    err
  };
};

export const interviewsFetcher = (category_id = 0) => {
  return (dispatch, getState) => {
    if (!getState().interviews.lastPage) {
      dispatch(gettingInterviews());
      getInterviews(getState().interviews.page, category_id)
        .then(res => {
          dispatch(gettingInterviewsSuccess(res));
        })
        .catch(error => {
          console.log(error);
          if (error.response)
            if (error.response.status === 400) {
              dispatch(setLastPageInterviews());
            } else {
              dispatch(gettingInterviewsFailure(error));
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
