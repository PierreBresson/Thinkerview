import React from "react";
import { Image, Text, View, Slider, StyleSheet } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import * as Components from "../../components";
import config from "../../config";

export default class PodcastScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 0
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

  renderControls = () => {
    return(
      <View style={styles.controlsView}>
        <Text style={styles.title}>
          François Ruffin sans filtre
        </Text>
        <Text style={styles.subTitle}>
          Politique
        </Text>
        <Slider
          style={{width:300}}
          maximumValue={100}
          value={this.state.sliderValue}
          onValueChange={(value) => this.setState({sliderValue: value})} 
        />
        <IconEntypo
          name={"controller-play"}
          size={64}
          color={config.colors.blackTorn}
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
          {this.renderControls()}
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
  controlsView: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 30,
    paddingBottom: 10
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
});
