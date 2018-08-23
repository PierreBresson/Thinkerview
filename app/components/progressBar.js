import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import TrackPlayer, { ProgressComponent } from "react-native-track-player";
import Slider from "react-native-slider";

import { formatTime } from "../logic/utils";
import config from "../config";

class ProgressBar extends ProgressComponent {
  render() {
    const position = formatTime(Math.floor(this.state.position));
    const duration = formatTime(Math.floor(this.state.duration));
    const info = position + " / " + duration;

    let progress = this.getProgress() * 100;
    let buffered = this.getBufferedProgress() * 100;
    buffered -= progress;
    if (buffered < 0) buffered = 0;

    return (
      <View style={styles.view}>
        <Text style={styles.info}>{info}</Text>
        <Slider
          minimumTrackTintColor={config.colors.thinkerGreen}
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          style={{ width: "100%" }}
          maximumValue={this.state.duration}
          value={this.state.position}
          onValueChange={value => TrackPlayer.seekTo(value)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    width: "100%"
  },
  info: {
    color: "#c0c0c0",
    fontSize: 16,
    fontWeight: "300",
    fontFamily: Platform.OS === "ios" ? config.fonts.bodyFont : ""
  },
  bar: {
    backgroundColor: "#575757",
    height: 5,
    width: "100%",
    margin: 10,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  played: {
    backgroundColor: "#03A9F4",
    height: 5
  },
  buffered: {
    backgroundColor: "#797979",
    height: 5
  },
  track: {
    height: 2,
    borderRadius: 1
  },
  thumb: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: config.colors.thinkerGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.35
  }
});

module.exports = ProgressBar;
