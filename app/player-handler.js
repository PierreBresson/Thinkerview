import TrackPlayer from "react-native-track-player";
import { Alert } from "react-native";
import { playbackState, playbackTrack } from "./actions";

async function eventHandler(store, data) {
  switch (data.type) {
    case "remote-play":
      TrackPlayer.play();
      break;
    case "remote-pause":
      TrackPlayer.pause();
      break;
    case "remote-seek":
      TrackPlayer.seekTo(data.position);
      break;
    case "remote-jump-foward":
      TrackPlayer.seekTo(data.position + 15);
      break;
    case "remote-jump-backward":
      TrackPlayer.seekTo(data.position - 15);
      break;
    case "playback-state":
      store.dispatch(playbackState(data.state));
      break;
    case "playback-track-changed":
      store.dispatch(playbackTrack(data.nextTrack));
      break;
    case "playback-error":
      Alert.alert("An error ocurred", data.error);
      break;
    default:
      break;
  }
}

module.exports = function(store) {
  return eventHandler.bind(null, store);
};
