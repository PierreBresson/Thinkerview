import React, { Component }  from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import Slider from "react-native-slider";
import * as Components from "../../components";
import config from "../../config";

class PodcastScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 50,
      title: 'François Ruffin sans filtre',
      subTitle: 'Politique',
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
    let { title, subTitle } = this.props.track;
    return(
      <View style={styles.infoPodastView}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subTitle}>
          {subTitle}
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

  renderControls = () => {
    console.log(this.props.player_state);
    return(
      <View style={styles.controlView}>
        <Components.default.PlayerButton
          iconName={"replay-10"}
          onPress={()=>{}}
        />
        <Components.default.PlayerButton
          iconName={this.props.player_state == TrackPlayer.STATE_PAUSED ? "controller-play" : "controller-paus"}
          onPress={async () => this._togglePlayPause()}
        />
        <Components.default.PlayerButton
          iconName={"forward-10"}
          onPress={()=>{}}
        />
      </View>
    )
  }

  render() {
    return (
        <View style={config.styles.container}>
          {this.renderIntro()}
          <View style={{flex:1}}>
            <Image 
              style={styles.coverImage}
              resizeMode={'contain'}
              source={config.images.logo}
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
  coverImage: {
    flex:1,
    alignSelf: 'center'
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
    fontFamily: config.fonts.titleFont
  },
  subTitle: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    fontFamily: config.fonts.bodyFont
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