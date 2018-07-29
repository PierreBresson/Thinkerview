import {
    FETCHING_INTERVIEWS,
    FETCHING_INTERVIEWS_SUCCESS,
    FETCHING_INTERVIEWS_ERROR,
  } from "../actions/types";
  
  const initialState = {
    isFetchingInterviews: false,
    errorFetchingInterviews: false,
    data: null,
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
        if(action.init) {
            return {
                ...state,
                data: action.interviews,
                isFetchingInterviews: false,
                errorFetchingInterviews: false
              };
        } else {
            return {
                ...state,
                data: [...state.data, action.interviews],
                isFetchingInterviews: false,
                errorFetchingInterviews: false
            };
        }
      case FETCHING_INTERVIEWS_ERROR:
        return {
          ...state,
          isFetchingInterviews: false,
          errorFetchingInterviews: true
        };
      default:
        return state;
    }
  });
  