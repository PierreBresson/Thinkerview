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

const downloadPodcast = (dispatch, podcast) => {
  return new Promise((resolve, reject) => {
    let audio_link = pathOr(false, ["audio_link"], podcast);
    console.log("TCL: downloadPodcast podcast", podcast);

    if (!audio_link) {
      reject("wrong audio link");
    } else {
      if (typeof audio_link === "string") {
        audio_link = audio_link.slice(0, audio_link.length - 11);
      } else {
        reject("wrong audio link");
      }
    }

    const taskMusic = RNBackgroundDownloader.download({
      id: String(podcast.id),
      url: audio_link,
      destination:
        `${RNBackgroundDownloader.directories.documents}/` +
        String(podcast.id) +
        ".mp3"
    })
      .begin(expectedBytes => {
        console.log(`TCL downloadPodcast Going to dl  ${expectedBytes} bytes!`);
      })
      .progress(percent => {
        console.log("TCL downloadPodcast: percent", percent);
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
        console.log("TCL taskMusic done", path);
        resolve(Platform.OS === "ios" ? "file://" + path : path);
      })
      .error(error => {
        console.log("TCL: downloadPodcast error", error);
        reject(error);
      });
  });
};

const downloadImage = podcast =>
  new Promise((resolve, reject) => {
    if (!podcast.img_url) {
      reject();
    }

    console.log("TCL: podcast downloadImage", podcast);

    const taskImage = RNBackgroundDownloader.download({
      id: String(podcast.id),
      url: podcast.img_url,
      destination:
        `${RNBackgroundDownloader.directories.documents}/` +
        String(podcast.id) +
        ".jpg"
    })
      .begin(expectedBytes => {
        console.log(`TCL downloadImage Going to dl ${expectedBytes} bytes!`);
      })
      .progress(percent => {
        console.log(`TCL downloadImage Downloaded: ${percent * 100}%`);
      })
      .done(() => {
        const path =
          `${RNBackgroundDownloader.directories.documents}/` +
          String(podcast.id) +
          ".jpg";
        console.log("TCL: path", path);
        resolve(Platform.OS === "ios" ? "file://" + path : path);
      })
      .error(error => {
        reject(error);
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
      // try {
      //   const pathImage = await downloadImage(podcast);
      //   console.log("TCL: pathImage", pathImage);
      //   dispatch({
      //     type: SAVE_PODCAST_OFFLINE_UPDATE,
      //     podcast: podcast,
      //     key: "image_offline",
      //     value: pathImage
      //   });
      // } catch (error) {
      //   console.log("TCL: shouldStartDownload downloadImage error", error);
      // }

      try {
        const pathMusic = await downloadPodcast(dispatch, podcast);
        console.log("TCL: pathMusic", pathMusic);
        dispatch({
          type: SAVE_PODCAST_OFFLINE_UPDATE,
          podcast: podcast,
          key: "path",
          value: pathMusic
        });
      } catch (error) {
        console.log("TCL: shouldStartDownload Podcast error", error);
        return dispatch({
          type: SAVE_PODCAST_OFFLINE_UPDATE,
          podcast: podcast,
          key: "hasError",
          value: "music_download_error"
        });
      }
    }
  };
};

export const deletePodcastOffline = podcast => {
  if (hasPath(["path"], podcast)) {
    console.log("TCL: hasPath delete", podcast);
    return async (dispatch, getState) => {
      deleteFile(podcast.path)
        .then(() => {
          if (podcast.image_offline) {
            deleteFile(podcast.image_offline)
              .then(() => {
                console.log("TCL: deleteFile done");
                return dispatch({
                  type: DELETE_PODCAST_OFFLINE,
                  podcast
                });
              })
              .catch(error => {
                console.log("TCL: error", error);
                return dispatch({
                  type: DELETE_PODCAST_OFFLINE_ERROR
                });
              });
          } else {
            return dispatch({
              type: DELETE_PODCAST_OFFLINE,
              podcast
            });
          }
        })
        .catch(error => {
          console.log("TCL: error", error);
          return dispatch({
            type: DELETE_PODCAST_OFFLINE,
            podcast
          });
        });
    };
  } else {
    console.log("TCL: delete else", podcast);
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
