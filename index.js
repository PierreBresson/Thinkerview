import { AppRegistry } from "react-native";
import App from "./app/index";
import TrackPlayer from "react-native-track-player";

AppRegistry.registerComponent("thinkerview", () => App);
TrackPlayer.registerPlaybackService(() => require("./empty-file"));
