import React, { Component } from "react";
import { Image, Text, View, SafeAreaView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import TrackPlayer from "react-native-track-player";
import PlayerButton from "../../components/playerButton";
import ProgressBar from "../../components/progressBar";
import config from "../../config";

class PodcastScreen extends Component {
  constructor(props) {
    super(props);
  }

  _togglePlayPause = () => {
    if (this.props.player_state == TrackPlayer.STATE_PAUSED) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  };

  renderIntro = () => {
    return (
      <View style={styles.headerView}>
        <Text style={styles.header}>{config.strings.podcastScreen.header}</Text>
      </View>
    );
  };

  renderInfoPodast = () => {
    return (
      <View style={styles.infoPodastView}>
        <Text style={styles.title}>{this.props.track.title}</Text>
      </View>
    );
  };

  _addOrRemoveSeconds = async seconds => {
    let position = await TrackPlayer.getPosition();
    TrackPlayer.seekTo(position + seconds);
  };

  renderControls = () => {
    return (
      <View style={styles.controlView}>
        <PlayerButton
          iconName={"replay-10"}
          onPress={() => this._addOrRemoveSeconds(-10)}
        />
        <PlayerButton
          iconName={
            this.props.player_state == TrackPlayer.STATE_PAUSED
              ? "controller-play"
              : "controller-paus"
          }
          onPress={async () => this._togglePlayPause()}
        />
        <PlayerButton
          iconName={"forward-10"}
          onPress={() => this._addOrRemoveSeconds(10)}
        />
      </View>
    );
  };

  render() {
    let { artwork } = this.props.track;
    return (
      <SafeAreaView style={config.styles.containerNoPadding}>
        {this.renderIntro()}
        <View style={config.styles.container}>
          <Image
            style={styles.artwork}
            resizeMode={"contain"}
            source={artwork ? { uri: artwork } : config.images.logo}
          />
          <View style={styles.bottomView}>
            {this.renderInfoPodast()}
            <ProgressBar />
            {this.renderControls()}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    paddingBottom: 20,
    alignItems: "center"
  },
  header: {
    fontSize: 30,
    fontFamily: config.fonts.titleFont,
    color: config.colors.black
  },
  artwork: {
    flex: 1,
    width: null,
    height: null
  },
  bottomView: {
    flex: 1,
    paddingBottom: 10
  },
  infoPodastView: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontFamily: config.fonts.titleFont,
    textAlign: "center",
    color: config.colors.black
  },
  controlView: {
    flex: 1,
    flexDirection: "row"
  }
});

function mapStateToProps(state) {
  return {
    player_state: state.player.player_state,
    track: state.player.track
  };
}

module.exports = connect(mapStateToProps)(PodcastScreen);
