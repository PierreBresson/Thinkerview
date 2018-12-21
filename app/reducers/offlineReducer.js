import {
  SAVE_PODCAST_OFFLINE,
  SAVE_PODCAST_OFFLINE_DONE,
  SAVE_PODCAST_OFFLINE_UPDATE_PROGRESS,
  SAVE_PODCAST_OFFLINE_ERROR,
  DELETE_PODCAST_OFFLINE,
  DELETE_PODCAST_OFFLINE_ERROR
} from "../actions/types";

const initialState = {
  data: []
};

remove = (array, element) => {
  return array.filter(e => e !== element);
};

findPodcast = (data, id) => {
  return data.find(item => {
    return item.id == id;
  });
};

export default (offlineReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PODCAST_OFFLINE:
      if (state.data.length) {
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
    case SAVE_PODCAST_OFFLINE_UPDATE_PROGRESS:
      if (findPodcast(state.data, action.podcast.id)) {
        return {
          ...state,
          data: [
            ...state.data,
            {
              ...podcast,
              progress: action.podcast.progress
            }
          ]
        };
      }
    case SAVE_PODCAST_OFFLINE_DONE:
      if (findPodcast(state.data, action.podcast.id)) {
        return {
          ...state,
          data: [
            ...state.data,
            {
              ...podcast,
              path: action.podcast.path
            }
          ]
        };
      }
    // case SAVE_PODCAST_OFFLINE_ERROR:
    // case DELETE_PODCAST_OFFLINE_ERROR:
    default:
      return state;
  }
});
