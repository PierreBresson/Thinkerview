import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";
import Header from "../../../components/header";
import ShareSocial from "../../../components/shareSocial";
import { connect } from "react-redux";
import {
  updateTrackInfo,
  shareSocialAction,
  savePodcastOffline
} from "../../../actions";
import YouTube, { YouTubeStandaloneAndroid } from "react-native-youtube";
import TrackPlayer from "react-native-track-player";
import IconEntypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AppInstalledChecker } from "react-native-check-app-install";
import config from "../../../config";
import _ from "lodash";

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      youtubeNativePlayer: false
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

  _playVideo = video_id => {
    YouTubeStandaloneAndroid.playVideo({
      apiKey: config.privateKeys.youtube_api_token,
      videoId: video_id,
      autoplay: true,
      startTime: 0
    })
      .then(() => console.log("Standalone Player Exited"))
      .catch(errorMessage => console.error(errorMessage));
  };

  renderVideoAndroid = (img_url, video_id) => {
    if (Platform.OS === "android")
      if (this.state.youtubeNativePlayer)
        return (
          <View style={{ flex: 1 }}>
            <Image source={{ uri: img_url }} style={styles.img} />
            <TouchableOpacity
              style={styles.btn}
              onPress={() => this._playVideo(video_id)}
            >
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

  renderVideoIOS = video_id => {
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
  };

  _playPodcast = async (audio_link, img_url, title) => {
    TrackPlayer.reset();
    await TrackPlayer.add({
      id: audio_link,
      url: audio_link,
      title: title,
      artist: "Thinkerview",
      album: "Interview",
      artwork: img_url
    });
    await TrackPlayer.play();
    let info = {
      title: title,
      url: audio_link,
      artwork: img_url
    };
    this.props.updateTrackInfo(info);
    this.props.navigation.navigate("Podcast");
  };

  renderAudio = (audio_link, img_url, title) => {
    if (audio_link && img_url && title) {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this._playPodcast(audio_link, img_url, title)}
          >
            <FontAwesome
              name={"podcast"}
              size={40}
              color={config.colors.thinkerGreen}
              style={styles.iconShare}
            />
            <Text style={[styles.btnText, { marginLeft: 17 }]}>
              {config.strings.articleScreen.playPodcast}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  renderOffLine = () => {
    let { articleSelected } = this.props.article;
    articleSelected = {
      ...articleSelected,
      hasError: null
    };

    if (articleSelected) {
      return (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            this.props.savePodcastOffline(articleSelected);
            this.props.navigation.navigate("Offline");
          }}
        >
          <IconEntypo
            name={"download"}
            size={40}
            color={config.colors.thinkerGreen}
            style={styles.iconShare}
          />
          <Text
            style={[styles.btnText, styles.btnTextLast, { marginRight: 20 }]}
          >
            {config.strings.articleScreen.savePodcast}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  render() {
    let {
      title,
      body,
      video_id,
      img_url,
      audio_link
    } = this.props.article.articleSelected;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={config.styles.containerNoPadding}>
          <Header
            share
            onPressLeft={() => this.props.navigation.goBack()}
            onPressRight={() => this.props.shareSocialAction()}
          />
          <View style={[config.styles.container, { height: "100%" }]}>
            {this.renderVideoAndroid(img_url, video_id)}
            {this.renderVideoIOS(video_id)}

            {this.renderAudio(audio_link, img_url, title)}
            {this.renderOffLine()}

            <Text style={styles.header}>{_.capitalize(title)}</Text>
            <Text style={styles.body}>{_.capitalize(body)}</Text>
          </View>
        </ScrollView>
        <ShareSocial />
      </View>
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
    color: config.colors.black,
    fontFamily: config.fonts.titleFont
  },
  body: {
    fontSize: 16,
    fontFamily: config.fonts.bodyFont,
    paddingTop: 10
  },
  imgContainer: {
    flex: 1,
    alignItems: "center"
  },
  img: {
    height: 200
  },
  btn: {
    marginTop: 10,
    marginBottom: 8,
    flexDirection: "row"
  },
  btnText: {
    fontFamily: config.fonts.bodyFont,
    fontSize: 20,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10
  },
  btnTextLast: {
    marginTop: 0,
    marginBottom: 10
  }
});

function mapStateToProps(state) {
  return {
    article: state.article
  };
}

const mapDispatchToProps = dispatch => {
  return {
    savePodcastOffline: podcast => dispatch(savePodcastOffline(podcast)),
    shareSocialAction: () => dispatch(shareSocialAction()),
    updateTrackInfo: info => dispatch(updateTrackInfo(info))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleScreen);
