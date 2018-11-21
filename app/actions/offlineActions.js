import { SAVE_PODCAST_OFFLINE, DELETE_PODCAST_OFFLINE } from "./types";

export const savePodcastOffline = podcast => {
  return {
    type: SAVE_PODCAST_OFFLINE,
    podcast
  };
};

export const deletePodcastOffline = podcast => {
  return {
    type: DELETE_PODCAST_OFFLINE,
    podcast
  };
};
