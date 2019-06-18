import { Alert, Platform } from "react-native";
import TrackPlayer from "react-native-track-player";
import { playbackState, playbackTrack } from "./actions";

// let interval = null; FOR LATER

async function eventHandler(store, data) {
  TrackPlayer.addEventListener("remote-play", () => {
    console.warn("TCL: eventHandler -> remote-play");
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener("remote-pause", () => {
    console.warn("TCL: eventHandler -> remote-pause");
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener("remote-stop", () => {
    TrackPlayer.stop();
  });

  TrackPlayer.addEventListener("remote-seek", () => {
    TrackPlayer.seekTo(data.position);
  });

  TrackPlayer.addEventListener("remote-jump-backward", () => {
    TrackPlayer.seekTo(data.position - 15);
  });

  TrackPlayer.addEventListener("remote-jump-forward", () => {
    TrackPlayer.seekTo(data.position + 15);
  });

  if (Platform.OS !== "ios") {
    // this event type is not supported on iOS
    TrackPlayer.addEventListener("remote-duck", () => {
      TrackPlayer.setVolume(data.ducking ? 0.5 : 1);
    });
  }

  TrackPlayer.addEventListener("playback-state", async data => {
    if (data.state) {
      store.dispatch(playbackState(data.state));
    }
  });

  TrackPlayer.addEventListener("playback-track-changed", async data => {
    if (data.nextTrack) {
      store.dispatch(playbackTrack(data.nextTrack));
    }
  });

  TrackPlayer.addEventListener("playback-error", data => {
    Alert.alert("Une erreur est survenue. Essayer a nouveau plus tard.");
    console.log("playback-error", data);
  });
}

export default function(store) {
  return eventHandler.bind(null, store);
}
