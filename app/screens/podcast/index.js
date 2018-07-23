import React, { Component }  from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import Slider from "react-native-slider";
import PlayerButton from "../../components/playerButton";
import config from "../../config";

class PodcastScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 50,
    }
  }

  _togglePlayPause = () => {
    if(this.props.player_state == TrackPlayer.STATE_PAUSED) {
        TrackPlayer.play();
    } else {
        TrackPlayer.pause();
    }
  }

  renderIntro = () => {
    return(
      <View style={styles.headerView}>
        <Text style={styles.header}>
          {config.strings.podcastScreen.header}
        </Text>
      </View>
    )
  }

  renderInfoPodast= () => {
    return(
      <View style={styles.infoPodastView}>
        <Text style={styles.title}>
          {this.props.track.title}
        </Text>
      </View>
    );
  }

  renderSlider = () => {
    return(
      <Slider
        disabled={true}
        minimumTrackTintColor={config.colors.thinkerGreen}
        trackStyle={styles.track}
        thumbStyle={styles.thumb}
        style={{width:'100%'}}
        maximumValue={100}
        value={this.state.sliderValue}
        onValueChange={(value) => this.setState({sliderValue: value})} 
      />
    )
  }

  _addOrRemoveSeconds = async (seconds) => {
    let position = await TrackPlayer.getPosition();
    TrackPlayer.seekTo(position+seconds);
  }

  renderControls = () => {
    return(
      <View style={styles.controlView}>
        <PlayerButton
          iconName={"replay-10"}
          onPress={()=>this._addOrRemoveSeconds(-10)}
        />
        <PlayerButton
          iconName={this.props.player_state == TrackPlayer.STATE_PAUSED ? "controller-play" : "controller-paus"}
          onPress={async () => this._togglePlayPause()}
        />
        <PlayerButton
          iconName={"forward-10"}
          onPress={()=>this._addOrRemoveSeconds(10)}
        />
      </View>
    )
  }

  render() {
    let { artwork } = this.props.track;    
    return (
        <View style={config.styles.container}>
          {this.renderIntro()}
          <View style={{flex:1}}>
            <Image 
              style={styles.artwork}
              resizeMode={'contain'}
              source={artwork?{uri: artwork}:config.images.logo}
            />
            <View style={styles.bottomView}>
              {this.renderInfoPodast()}
              {this.renderSlider()}
              {this.renderControls()}
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: "center", 
  },
  header: {
    fontSize: 30,
    fontFamily: config.fonts.titleFont
  },
  artwork: {
    flex: 1, 
    width: null, 
    height: null
  },
  bottomView: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 10
  },
  infoPodastView: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: config.fonts.titleFont,
    textAlign: 'center'
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: config.colors.thinkerGreen,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
  controlView: {
    flex:1,
    flexDirection: 'row',
  },
});

function mapStateToProps(state) {
  return {
      player_state: state.playback.player_state,
      track: state.track
  };
}

module.exports = connect(mapStateToProps)(PodcastScreen);