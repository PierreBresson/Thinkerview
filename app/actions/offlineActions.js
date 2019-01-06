import { Platform } from "react-native";
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
    if (!hasPath(["id"], podcast)) {
      return dispatch({
        type: ""
      });
    }
    dispatch({
      type: SAVE_PODCAST_OFFLINE,
      podcast
    });
    return dispatch(savePodcastOfflineStart(podcast));
  };
};

export const savePodcastOfflineStart = podcast => {
  let dirs = RNFetchBlob.fs.dirs;
  return (dispatch, getState) => {
    let shouldStartDownload = false;

    const podcastInTheList = findPodcast(getState().offline.data, podcast.id);

    if (podcastInTheList) {
      if (podcastInTheList.progress === "0") {
        dispatch({
          type: SAVE_PODCAST_OFFLINE_UPDATE,
          podcast: podcast,
          key: "progress",
          value: "1"
        });
        shouldStartDownload = true;
      }
    }

    if (shouldStartDownload) {
      RNFetchBlob.config({
        IOSBackgroundTask: true,
        fileCache: true,
        path: dirs.DocumentDir + "/" + podcast.id + ".mp3"
      })
        .fetch("GET", "http://www.hubharp.com/web_sound/BachGavotteShort.mp3")
        .progress({ count: 5 }, (received, total) => {
          dispatch({
            type: SAVE_PODCAST_OFFLINE_UPDATE,
            podcast: podcast,
            key: "progress",
            value: String(Math.round((received / total) * 100))
          });
        })
        .then(res => {
          dispatch({
            type: SAVE_PODCAST_OFFLINE_UPDATE,
            podcast: podcast,
            key: "path",
            value:
              Platform.OS === "ios"
                ? "file://" + res.path()
                : "file://" + res.path()
            // +podcast.audio_link.replace(/^.*[\\\/]/, "").slice(0, -11)
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
