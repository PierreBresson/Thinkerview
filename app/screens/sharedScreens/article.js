import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform, StyleSheet } from "react-native";
import * as Components from "../../components";
import YouTube, { YouTubeStandaloneAndroid } from 'react-native-youtube';
import IconEntypo from "react-native-vector-icons/Entypo";
import { AppInstalledChecker } from "react-native-check-app-install";
import { AppConsumer } from '../../context';
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
          <View style={{flex: 1}}>
            <Image source={{uri: img_url}} style={styles.img} />
            <TouchableOpacity style={styles.btn} onPress={()=>this.playVideo(video_id)}>
              <IconEntypo
                name={"video"}
                size={40}
                color={config.colors.thinkerGreen}
                style={styles.iconShare}
              />
              <Text style={styles.btnText}>
                {config.strings.articleScreen.playVideo}
              </Text>
            </TouchableOpacity>
          </View>
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

  renderAudio = (audio_link, img_url, title) => {
    if(audio_link && img_url && title)
      return (
        <View style={{flex: 1}}>
          <TouchableOpacity style={styles.btn} onPress={()=>this.context.playPodcast(audio_link, img_url, title)}>
            <IconEntypo
              name={"note"}
              size={40}
              color={config.colors.thinkerGreen}
              style={styles.iconShare}
            />
            <Text style={styles.btnText}>
              {config.strings.articleScreen.playVideo}
            </Text>
          </TouchableOpacity>
        </View>
      );
  }

  render() {
    let item = this.props.navigation.getParam("item");
    if (!item) return null;
    let { title, body, video_id, img_url, audio_link } = item;

    return (
      <AppConsumer>
      { (context) => (
        <ScrollView style={config.styles.containerNoPadding} ref={(ref) => { this.context = context; }}>
          <Components.default.Header
            share
            onPressLeft={()=>this.props.navigation.goBack()} 
            onPressRight={()=>this.setState({ shareSocialOpen: !this.state.shareSocialOpen})
          }/>
          <View style={config.styles.container}>

            {this.renderVideoAndroid(img_url, video_id)}
            {this.renderVideoIOS(video_id)}

            {this.renderAudio(audio_link, img_url, title)}

            <Text style={styles.header}>
              {_.capitalize(title)}
            </Text>

            <Text style={styles.body}>
              {_.capitalize(body)}
            </Text>

            <Components.default.ShareSocial shareSocialOpen={this.state.shareSocialOpen}/>
          </View>
        </ScrollView>
      )}
      </AppConsumer>
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
