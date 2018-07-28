import {
    FETCHING_INTERVIEWS,
    FETCHING_INTERVIEWS_SUCCESS,
    FETCHING_INTERVIEWS_ERROR,
  } from "./types";
import getInterviews from "../services/api/getInterviews";

export const gettingInterviews = () => {
  return {
    type: FETCHING_INTERVIEWS,
  };
};

export const gettingInterviewsSuccess = (interviews, init) => {
  return {
    type: FETCHING_INTERVIEWS_SUCCESS,
    interviews,
    init
  };
};

export const gettingInterviewsFailure = err => {
  return {
    type: FETCHING_INTERVIEWS_ERROR,
    err
  };
};

export const interviewsFetcher = (page=1) => {    
  return (dispatch, getState) => {
    dispatch(gettingInterviews());
    getInterviews(page)
      .then(res => {
        dispatch(gettingInterviewsSuccess(res,page==1?true:false));
      })
      .catch(err => {        
        dispatch(gettingInterviewsFailure(err));
      });
  };
};