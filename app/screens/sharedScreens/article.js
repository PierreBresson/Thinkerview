import React from "react";
import ReactNative, { Platform, StyleSheet } from "react-native";
import * as Components from "../../components";
import YouTube from "react-native-youtube";
import { AppInstalledChecker } from "react-native-check-app-install";
import config from "../../config";
import _ from "lodash";

export default class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      youtubeNativePlayer: false,
      height: 215
    };
  }

  componentWillMount() {
    if (Platform.OS === "ios") {
      this.setState({
        youtubeNativePlayer: true
      });
    } else {
      AppInstalledChecker.isAppInstalled("youtube").then(isInstalled => {
        if (isInstalled) {
          this.setState({
            youtubeNativePlayer: true
          });
        }
      });
    }
  }

  renderVideo = (videoId) => {
    setTimeout(() => this.setState({ height: 216 }), 200);
    if (this.state.youtubeNativePlayer) {
      return (
        <YouTube
          videoId={videoId}
          play={false}
          fullscreen={Platform.OS === "ios" ? true : false}
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{ alignSelf: "stretch", height: this.state.height }}
          apiKey={config.privateKeys.youtube_api_token}
        />
      );
    } else {
      return (
        <ReactNative.Text style={styles.body}>
          {config.strings.articleScreen.noYoutube}
        </ReactNative.Text>
      );
    }
  };

  render() {
    let item = this.props.navigation.getParam("item");
    if (!item) return null;
    let { title, body, video_id } = item;

    return (
      <ReactNative.View style={config.styles.containerNoPadding}>
        <Components.default.Header onPress={()=>this.props.navigation.goBack()}/>
        <ReactNative.View style={config.styles.container}>
          {this.renderVideo(video_id)}
          <ReactNative.Text style={styles.header}>
            {_.capitalize(title)}
          </ReactNative.Text>
          <ReactNative.Text style={styles.body}>
            {_.capitalize(body)}
          </ReactNative.Text>
        </ReactNative.View>
      </ReactNative.View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 200
  },
  header: {
    fontSize: 20,
    fontFamily: config.fonts.titleFont,
    paddingTop: 30,
  },
  body: {
    fontSize: 16,
    fontFamily: config.fonts.bodyFont,
    paddingTop: 10,
  },
});
