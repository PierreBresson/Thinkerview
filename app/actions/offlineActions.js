import {
  SELECT_OFFLINE_PODCAST,
  SAVE_PODCAST_OFFLINE,
  SAVE_PODCAST_OFFLINE_DONE,
  SAVE_PODCAST_OFFLINE_UPDATE_PROGRESS,
  SAVE_PODCAST_OFFLINE_ERROR,
  DELETE_PODCAST_OFFLINE,
  DELETE_PODCAST_OFFLINE_ERROR
} from "./types";
import RNFetchBlob from "rn-fetch-blob";
import { hasPath } from "ramda";

export const selectOfflinePodcast = podcast => {
  return {
    type: SELECT_OFFLINE_PODCAST,
    podcast
  };
};

export const savePodcastOffline = podcast => {
  return {
    type: SAVE_PODCAST_OFFLINE,
    podcast
  };
};

export const savePodcastOfflineStart = podcast => {
  if (!hasPath(["id"], podcast)) {
    return {
      type: ""
    };
  }
  let dirs = RNFetchBlob.fs.dirs;
  return (dispatch, getState) => {
    RNFetchBlob.config({
      IOSBackgroundTask: true,
      fileCache: true,
      path: dirs.DocumentDir + podcast.id
    })
      .fetch("GET", "http://www.hubharp.com/web_sound/BachGavotteShort.mp3")
      .progress({ count: 5 }, (received, total) => {
        dispatch({
          type: SAVE_PODCAST_OFFLINE_UPDATE_PROGRESS,
          podcast: {
            ...podcast,
            progress: String(Math.round((received / total) * 100))
          }
        });
      })
      .then(res => {
        dispatch({
          type: SAVE_PODCAST_OFFLINE_DONE,
          podcast: {
            ...podcast,
            path: res.path()
          }
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: SAVE_PODCAST_OFFLINE_ERROR,
          podcast
        });
      });
  };
};

export const deletePodcastOffline = podcast => {
  console.log(hasPath(["title"], podcast));
  return {
    type: DELETE_PODCAST_OFFLINE,
    podcast
  };
  if (!hasPath(["path"], podcast)) {
    console.log("podcast has no path");
    return {
      type: DELETE_PODCAST_OFFLINE,
      podcast
    };
  }
  RNFetchBlob.fs
    .unlink(podcast.path)
    .then(() => {
      return {
        type: DELETE_PODCAST_OFFLINE,
        podcast
      };
    })
    .catch(err => {
      console.log(err);
      return {
        type: DELETE_PODCAST_OFFLINE_ERROR
      };
    });
};
