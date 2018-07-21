import React from "react";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "react-native-slider";
import * as Components from "../../components";
import { AppConsumer } from '../../context';
import config from "../../config";

export default class PodcastScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 50,
      title: 'François Ruffin sans filtre',
      subTitle: 'Politique',
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

  renderInfoPodast= (context) => {
    const { title, artist } = context.track;
    return(
      <View style={styles.infoPodastView}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subTitle}>
          {artist}
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

  renderControls = (context) => {
    return(
      <View style={styles.controlView}>
        <Components.default.PlayerButton
          iconName={"controller-fast-backward"}
          onPress={()=>context.back15()}
        />
        <Components.default.PlayerButton
          iconName={context.giveStateIcon()}
          onPress={()=>context.playPause()}
        />
        <Components.default.PlayerButton
          iconName={"controller-fast-forward"}
          onPress={()=>context.forward15()}
        />
      </View>
    )
  }

  render() {
    return (
      <AppConsumer>
      { (context) => (
        <View style={config.styles.container} ref={(ref) => { this.context = context; }}>
          {this.renderIntro()}
          <View style={{flex:1}}>
            <Image 
              style={styles.coverImage}
              resizeMode={'contain'}
              source={config.images.logo}
            />
            <View style={styles.bottomView}>
              {this.renderInfoPodast(context)}
              {this.renderSlider()}
              {this.renderControls(context)}
            </View>
          </View>
        </View>
      )}
      </AppConsumer>
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
