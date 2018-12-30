import {
  SELECT_OFFLINE_PODCAST,
  SAVE_PODCAST_OFFLINE,
  SAVE_PODCAST_OFFLINE_UPDATE,
  SAVE_PODCAST_OFFLINE_ERROR,
  DELETE_PODCAST_OFFLINE,
  DELETE_PODCAST_OFFLINE_ERROR
} from "./types";
import RNFetchBlob from "rn-fetch-blob";
import { hasPath } from "ramda";

findPodcast = (data, id) => {
  return data.find(item => {
    return item.id == id;
  });
};

export const selectOfflinePodcast = podcast => {
  return {
    type: SELECT_OFFLINE_PODCAST,
    podcast
  };
};

export const savePodcastOffline = podcast => {
  return (dispatch, getState) => {
    dispatch({
      type: SAVE_PODCAST_OFFLINE,
      podcast
    });
    dispatch(savePodcastOfflineStart(podcast));
  };
};

export const savePodcastOfflineStart = podcast => {
  let dirs = RNFetchBlob.fs.dirs;
  return (dispatch, getState) => {
    //if podcast has id we can start download
    let shouldNotStartDownload = hasPath(["id"], podcast);
    //if podcast can be find in the saved list
    const podcastInTheList = findPodcast(getState().offline.data, podcast.id);
    if (podcastInTheList) {
      shouldNotStartDownload = hasPath(["progress"], podcastInTheList);
    } else {
      shouldNotStartDownload = false;
    }

    if (shouldNotStartDownload) {
      dispatch({
        type: ""
      });
    } else {
      RNFetchBlob.config({
        IOSBackgroundTask: true,
        fileCache: true,
        path: dirs.DocumentDir + podcast.id
      })
        .fetch("GET", "http://www.hubharp.com/web_sound/BachGavotteShort.mp3")
        .progress({ count: 5 }, (received, total) => {
          dispatch({
            type: SAVE_PODCAST_OFFLINE_UPDATE,
            podcast: {
              ...podcast,
              progress: String(Math.round((received / total) * 100))
            }
          });
        })
        .then(res => {
          dispatch({
            type: SAVE_PODCAST_OFFLINE_UPDATE,
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
    }
  };
};

export const deletePodcastOffline = podcast => {
  if (hasPath(["path"], podcast)) {
    return (dispatch, getState) => {
      RNFetchBlob.fs
        .unlink(podcast.path)
        .then(() => {
          dispatch({
            type: DELETE_PODCAST_OFFLINE,
            podcast
          });
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: DELETE_PODCAST_OFFLINE_ERROR
          });
        });
    };
  } else {
    return {
      type: DELETE_PODCAST_OFFLINE,
      podcast
    };
  }
};
