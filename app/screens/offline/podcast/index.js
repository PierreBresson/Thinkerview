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
import { connect } from "react-redux";
import {
  updateTrackInfo,
  shareSocialAction,
  deletePodcastOffline
} from "../../../actions";
import TrackPlayer from "react-native-track-player";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import config from "../../../config";
import _ from "lodash";

class OfflinePodcastScreen extends React.Component {
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

  _removePodcast = () => {
    const offlinePodcastSelected = this.getOfflinePodcastSelected();
    if (offlinePodcastSelected) {
      this.props.navigation.goBack();
      this.props.deletePodcastOffline(offlinePodcastSelected);
    }
  };

  renderAudio = () => {
    const { title, img_url, path } = this.getOfflinePodcastSelected();

    if (path && img_url && title) {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this._playPodcast(path, img_url, title)}
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

  renderDeletePodcast = podcast => {
    const { path, hasError } = this.getOfflinePodcastSelected();
    console.log("TCL: OfflinePodcastScreen -> hasError", hasError);
    const delete_message = path
      ? config.strings.articleScreen.removePodcast
      : config.strings.articleScreen.removePodcastDuringDownload;

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this._removePodcast(podcast)}
        >
          <FontAwesome
            name={"trash"}
            size={40}
            color={config.colors.thinkerGreen}
            style={styles.iconShare}
          />
          <Text style={[styles.btnText, { marginLeft: 17 }]}>
            {delete_message}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderDownloadProgress = () => {
    const { progress, path } = this.getOfflinePodcastSelected();
    if (path) {
      return null;
    } else {
      return (
        <View style={[{ flex: 1 }, styles.btn]}>
          <MaterialCommunityIcons
            name={"progress-download"}
            size={40}
            color={config.colors.thinkerGreen}
            style={styles.iconShare}
          />
          <Text style={[styles.btnText, { marginLeft: 10 }]}>
            {config.strings.articleScreen.curentProgress + progress + "%"}
          </Text>
        </View>
      );
    }
  };

  renderImage = () => {
    let { img_url, image_offline } = this.getOfflinePodcastSelected();

    return (
      <Image
        style={styles.img}
        resizeMode="cover"
        source={{ uri: image_offline ? image_offline : img_url }}
      />
    );
  };

  getOfflinePodcastSelected = () => {
    const emptyPodcast = {
      id: "",
      img_url: "",
      title: "",
      body: "",
      image_offline: "",
      progress: "",
      hasError: null
    };

    return (
      this.props.offline.data.find(
        podcast => podcast.id === this.props.offline.offlinePodcastSelected.id
      ) || emptyPodcast
    );
  };

  render() {
    const { offlinePodcastSelected } = this.props.offline;
    const { title, body } = offlinePodcastSelected;
    console.log("TCL offlinePodcastSelected", offlinePodcastSelected);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={config.styles.containerNoPadding}>
          <Header onPressLeft={() => this.props.navigation.goBack()} />
          <View style={[config.styles.container, { height: "100%" }]}>
            {this.renderImage()}
            {this.renderDownloadProgress()}
            {this.renderAudio()}
            {this.renderDeletePodcast()}
            <Text style={styles.header}>{_.capitalize(title)}</Text>
            <Text style={styles.body}>{_.capitalize(body)}</Text>
          </View>
        </ScrollView>
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
    fontFamily: config.fonts.black
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
    marginTop: 10
  }
});

function mapStateToProps(state) {
  return {
    offline: state.offline
  };
}

const mapDispatchToProps = dispatch => {
  return {
    shareSocialAction: () => dispatch(shareSocialAction()),
    updateTrackInfo: info => dispatch(updateTrackInfo(info)),
    deletePodcastOffline: podcast => dispatch(deletePodcastOffline(podcast))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfflinePodcastScreen);
