import { Platform } from "react-native";
import {
  SELECT_OFFLINE_PODCAST,
  SAVE_PODCAST_OFFLINE,
  SAVE_PODCAST_OFFLINE_UPDATE,
  SAVE_PODCAST_OFFLINE_ERROR,
  DELETE_PODCAST_OFFLINE,
  DELETE_PODCAST_OFFLINE_ERROR
} from "./types";
import RNBackgroundDownloader from "react-native-background-downloader";
import { hasPath, pathOr } from "ramda";
var RNFS = require("react-native-fs");

const testMP3 = "http://www.hubharp.com/web_sound/BachGavotteShort.mp3";

const downloadPodcast = (dispatch, podcast) =>
  new Promise((resolve, reject) => {
    let audio_link = pathOr(false, ["audio_link"], podcast);

    if (!audio_link) {
      reject();
    } else {
      if (typeof audio_link === "string") {
        audio_link.slice(0, audio_link.length - 11);
      } else {
        reject();
      }
    }

    let taskMp3 = RNBackgroundDownloader.download({
      id: String(podcast.id),
      url: audio_link,
      // url: testMP3,
      destination:
        `${RNBackgroundDownloader.directories.documents}/` +
        String(podcast.id) +
        ".mp3"
    })
      .begin(expectedBytes => {
        console.log(`Going to download ${expectedBytes} bytes!`);
      })
      .progress(percent => {
        console.log("TCL: percent", percent);
        dispatch({
          type: SAVE_PODCAST_OFFLINE_UPDATE,
          podcast: podcast,
          key: "progress",
          value: String(Math.floor(percent * 100))
        });
      })
      .done(() => {
        const path =
          `${RNBackgroundDownloader.directories.documents}/` +
          String(podcast.id) +
          ".mp3";
        dispatch({
          type: SAVE_PODCAST_OFFLINE_UPDATE,
          podcast: podcast,
          key: "path",
          value: Platform.OS === "ios" ? "file://" + path : path
        });
        resolve();
      })
      .error(error => {
        console.log(error);
        dispatch({
          type: SAVE_PODCAST_OFFLINE_ERROR,
          podcast
        });
        reject();
      });
  });

const downloadImage = (dispatch, podcast) =>
  new Promise((resolve, reject) => {
    if (!podcast.img_url) {
      reject();
    }

    let taskImage = RNBackgroundDownloader.download({
      id: String(podcast.id),
      url: podcast.img_url,
      destination:
        `${RNBackgroundDownloader.directories.documents}/` +
        String(podcast.id) +
        ".jpg"
    })
      .done(() => {
        const path =
          `${RNBackgroundDownloader.directories.documents}/` +
          String(podcast.id) +
          ".jpg";
        dispatch({
          type: SAVE_PODCAST_OFFLINE_UPDATE,
          podcast: podcast,
          key: "image_offline",
          value: "file://" + path
        });
        resolve();
      })
      .error(error => {
        console.log(error);
        dispatch({
          type: SAVE_PODCAST_OFFLINE_ERROR,
          podcast
        });
        reject();
      });
  });

const deleteFile = path =>
  new Promise((resolve, reject) => {
    RNFS.unlink(path)
      .then(resolve)
      .catch(reject);
  });

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
  return async (dispatch, getState) => {
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
      await downloadImage(dispatch, podcast);
      await downloadPodcast(dispatch, podcast);
    }
  };
};

export const deletePodcastOffline = podcast => {
  if (hasPath(["path"], podcast)) {
    return async (dispatch, getState) => {
      try {
        await deleteFile(podcast.path);
        await deleteFile(podcast.image_offline);
        dispatch({
          type: DELETE_PODCAST_OFFLINE,
          podcast
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: DELETE_PODCAST_OFFLINE_ERROR
        });
      }
    };
  } else {
    return {
      type: DELETE_PODCAST_OFFLINE,
      podcast
    };
  }
};

export const updatePodcast = (id, key, value) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SAVE_PODCAST_OFFLINE_UPDATE,
      podcast: { id: Number(id) },
      key,
      value
    });
  };
};
