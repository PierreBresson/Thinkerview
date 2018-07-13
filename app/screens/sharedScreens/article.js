import React from "react";
import ReactNative, { Platform, StyleSheet } from "react-native";
import * as Components from "../../components";
import YouTube, { YouTubeStandaloneAndroid } from 'react-native-youtube';
import IconEntypo from "react-native-vector-icons/Entypo";
import { AppInstalledChecker } from "react-native-check-app-install";
import config from "../../config";
import _ from "lodash";

export default class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      youtubeNativePlayer: false,
      shareSocialOpen: false,
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

  playVideo = (video_id) => {
    YouTubeStandaloneAndroid.playVideo({
      apiKey: config.privateKeys.youtube_api_token, 
      videoId: video_id, 
      autoplay: true, 
      startTime: 0,
    })
      .then(() => console.log('Standalone Player Exited'))
      .catch(errorMessage => console.error(errorMessage))
  }

  renderVideoAndroid = (img_url, video_id) => {
    if (Platform.OS === "android")
      if (this.state.youtubeNativePlayer)
        return (
          <ReactNative.View style={{flex: 1}}>
            <ReactNative.Image source={{uri: img_url}} style={styles.img} />
            <ReactNative.TouchableOpacity style={styles.btn} onPress={()=>this.playVideo(video_id)}>
              <IconEntypo
                name={"video"}
                size={40}
                color={config.colors.thinkerGreen}
                style={styles.iconShare}
              />
              <ReactNative.Text style={styles.btnText}>
                {config.strings.articleScreen.playVideo}
              </ReactNative.Text>
            </ReactNative.TouchableOpacity>
          </ReactNative.View>
        );
  };

  renderVideoIOS = (video_id) => {
    if (Platform.OS === "ios")
      return (
        <YouTube
          videoId={video_id}
          play={false}
          fullscreen={true}
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{ alignSelf: "stretch", height: 220 }}
          apiKey={config.privateKeys.youtube_api_token}
        />
      );
  }

  render() {
    let item = this.props.navigation.getParam("item");
    if (!item) return null;
    let { title, body, video_id, img_url } = item;

    return (
      <ReactNative.ScrollView style={config.styles.containerNoPadding}>
        <Components.default.Header
          share
          onPressLeft={()=>this.props.navigation.goBack()} 
          onPressRight={()=>this.setState({ shareSocialOpen: !this.state.shareSocialOpen})
        }/>
        <ReactNative.View style={config.styles.container}>

          {this.renderVideoAndroid(img_url, video_id)}
          {this.renderVideoIOS(video_id)}

          <ReactNative.Text style={styles.header}>
            {_.capitalize(title)}
          </ReactNative.Text>

          <ReactNative.Text style={styles.body}>
            {_.capitalize(body)}
          </ReactNative.Text>

          <Components.default.ShareSocial shareSocialOpen={this.state.shareSocialOpen}/>
        </ReactNative.View>
      </ReactNative.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 200
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    fontSize: 20,
    fontFamily: config.fonts.titleFont,
  },
  body: {
    fontSize: 16,
    fontFamily: config.fonts.bodyFont,
    paddingTop: 10,
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    height: 200,
  },
  btn: {
    marginTop: 18,
    marginBottom: 18,
    flexDirection: "row"
  },
  btnText: {
    fontFamily: config.fonts.bodyFont,
    fontSize: 20,
    marginLeft: 12,
    marginTop: 10
  }
});
