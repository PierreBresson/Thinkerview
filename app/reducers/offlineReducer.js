import { SAVE_PODCAST_OFFLINE, DELETE_PODCAST_OFFLINE } from "../actions/types";

const initialState = {
  data: null
};

remove = (array, element) => {
  return array.filter(e => e !== element);
};

export default (offlineReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PODCAST_OFFLINE:
      if (state.data) {
        if (!state.data.includes(action.podcast)) {
          return {
            ...state,
            data: [...state.data, action.podcast]
          };
        } else {
          return { ...state };
        }
      } else {
        return {
          ...state,
          data: [action.podcast]
        };
      }
    case DELETE_PODCAST_OFFLINE:
      return {
        ...state,
        data: remove(state.data, action.podcast)
      };
    default:
      return state;
  }
});
