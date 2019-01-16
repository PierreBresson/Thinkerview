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
        IOSDownloadTask: true,
        fileCache: true,
        path: RNFetchBlob.fs.dirs.DocumentDir + "/" + podcast.id + ".mp3"
      })
        .fetch("GET", podcast.audio_link)
        .progress({ interval: 4000 }, (received, total) => {
          dispatch({
            type: SAVE_PODCAST_OFFLINE_UPDATE,
            podcast: podcast,
            key: "progress",
            value: String(Math.floor((received / total) * 100))
          });
        })
        .then(res => {
          dispatch({
            type: SAVE_PODCAST_OFFLINE_UPDATE,
            podcast: podcast,
            key: "path",
            value: Platform.OS === "ios" ? "file://" + res.path() : res.path()
          });
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: SAVE_PODCAST_OFFLINE_ERROR,
            podcast
          });
        });
      // RNFetchBlob.config({
      //   IOSBackgroundTask: true,
      //   fileCache: true,
      //   path: RNFetchBlob.fs.dirs.DocumentDir + "/" + podcast.id + ".jpg"
      // })
      //   .fetch("GET", podcast.img_url)
      //   .then(res => {
      //     dispatch({
      //       type: SAVE_PODCAST_OFFLINE_UPDATE,
      //       podcast: podcast,
      //       key: "image_offline",
      //       value: res.path()
      //     });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
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
