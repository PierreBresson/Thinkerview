import { SAVE_PODCAST_OFFLINE, DELETE_PODCAST_OFFLINE } from "./types";
import RNFetchBlob from "rn-fetch-blob";
// var path = RNFS.DocumentDirectoryPath + "/test.txt";

export const savePodcastOffline = podcast => {
  // let dirs = RNFetchBlob.fs.dirs;
  // RNFetchBlob.config({
  //   IOSBackgroundTask: true,
  //   fileCache: true,
  //   path: dirs.DocumentDir + "/path-to-file.anything"
  // })
  //   .fetch("GET", "http://www.example.com/file/example.zip", {
  //     //some headers ..
  //   })
  //   .then(res => {
  //     // the temp file path
  //     console.log("The file saved to ", res.path());
  //   });
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
