import {
  SAVE_PODCAST_OFFLINE,
  SAVE_PODCAST_OFFLINE_DONE,
  SAVE_PODCAST_OFFLINE_UPDATE_PROGRESS,
  SAVE_PODCAST_OFFLINE_ERROR,
  DELETE_PODCAST_OFFLINE,
  DELETE_PODCAST_OFFLINE_ERROR
} from "./types";
import RNFetchBlob from "rn-fetch-blob";
import { hasPath } from "ramda";

export const savePodcastOffline = podcast => {
  console.log(podcast);
  return {
    type: SAVE_PODCAST_OFFLINE,
    podcast
  };
};

export const savePodcastOfflineStart = podcast => {
  if (!hasPath(["id"], podcast)) {
    console.log("podcast has no id");
    return;
  }
  let dirs = RNFetchBlob.fs.dirs;
  RNFetchBlob.config({
    IOSBackgroundTask: true,
    fileCache: true,
    path: dirs.DocumentDir + podcast.id
  })
    .fetch("GET", "http://www.hubharp.com/web_sound/BachGavotteShort.mp3")
    .progress({ count: 5 }, (received, total) => {
      console.log("progress", received / total);
      return {
        type: SAVE_PODCAST_OFFLINE_UPDATE_PROGRESS,
        podcast: {
          ...podcast,
          progress: Maths.round((received / total) * 100)
        }
      };
    })
    .then(res => {
      SAVE_PODCAST_OFFLINE_DONE;
      console.log(res);
      console.log("The file saved to ", res.path());
      return {
        type: SAVE_PODCAST_OFFLINE_DONE,
        podcast: {
          ...podcast,
          path: res.path()
        }
      };
    })
    .catch(err => {
      console.log(err);
      return {
        type: SAVE_PODCAST_OFFLINE_ERROR,
        podcast
      };
    });
};

export const deletePodcastOffline = podcast => {
  if (!hasPath(["path"], podcast)) {
    console.log("podcast has no path");
    return;
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
