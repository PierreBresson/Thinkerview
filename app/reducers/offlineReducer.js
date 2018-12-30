import {
  SELECT_OFFLINE_PODCAST,
  SAVE_PODCAST_OFFLINE,
  SAVE_PODCAST_OFFLINE_UPDATE,
  SAVE_PODCAST_OFFLINE_ERROR,
  DELETE_PODCAST_OFFLINE,
  DELETE_PODCAST_OFFLINE_ERROR
} from "../actions/types";
import { update, includes } from "ramda";

const initialState = {
  offlinePodcastSelected: null,
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
    case SELECT_OFFLINE_PODCAST:
      return {
        ...state,
        offlinePodcastSelected: action.podcast
      };
    case SAVE_PODCAST_OFFLINE:
      if (state.data.length) {
        if (!includes(action.podcast, state.data)) {
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
    case SAVE_PODCAST_OFFLINE_UPDATE:
      const podcast = findPodcast(state.data, action.podcast.id);
      if (podcast) {
        return {
          ...state,
          data: update(podcast, action.podcast, state.data)
        };
      }
    // case SAVE_PODCAST_OFFLINE_ERROR:
    // case DELETE_PODCAST_OFFLINE_ERROR:
    default:
      return state;
  }
});
