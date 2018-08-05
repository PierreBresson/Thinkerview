import React from "react";
import { TouchableOpacity, Linking, View, StyleSheet } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import config from "../config";

const FACEBOOK = "facebook";
const TWITTER = "twitter";
const YOUTUBE = "youtube";
const LINK = "link";
const PAYPAL = "paypal";
const GITHUB = "github";
const CREATIVE_COMMONS = "creative-commons";
const MASTODON = "mastodon";
const PEERTUBE = "video";

export default class DisplayNetwork extends React.Component {
  constructor(props) {
    super(props);
  }

  findColor = socialMediaName => {
    switch (socialMediaName) {
      case FACEBOOK:
        return config.colors.socialMedia.facebook;
      case TWITTER:
        return config.colors.socialMedia.twitter;
      case YOUTUBE:
        return config.colors.socialMedia.youtube;
      case MASTODON:
        return config.colors.socialMedia.mastodon;
      case PEERTUBE:
        return config.colors.socialMedia.peertube;
      default:
        return config.colors.blackTorn;
    }
  };

  renderItem = (socialMediaUrl, socialMediaName, library = "entypo") => {
    if (!socialMediaUrl || !socialMediaName) return null;
    if (library === "FontAwesome5")
      return (
        <TouchableOpacity onPress={() => Linking.openURL(socialMediaUrl)}>
          <FontAwesome5
            name={socialMediaName}
            size={26}
            color={this.findColor(socialMediaName)}
            style={styles.icon}
          />
        </TouchableOpacity>
      );
    if (library === "entypo")
      return (
        <TouchableOpacity onPress={() => Linking.openURL(socialMediaUrl)}>
          <IconEntypo
            name={socialMediaName}
            size={26}
            color={this.findColor(socialMediaName)}
            style={styles.icon}
          />
        </TouchableOpacity>
      );
  };

  render() {
    let {
      facebook_url,
      twitter_url,
      youtube_url,
      website_url,
      paypal_url,
      github_url,
      creative_commons_url,
      mastodon_url,
      peertube_url
    } = this.props;
    return (
      <View>
        <View style={styles.iconContainer}>
          {this.renderItem(facebook_url, FACEBOOK)}
          {this.renderItem(twitter_url, TWITTER)}
          {this.renderItem(youtube_url, YOUTUBE)}
          {this.renderItem(website_url, LINK)}
          {this.renderItem(paypal_url, PAYPAL)}
          {this.renderItem(github_url, GITHUB)}
          {this.renderItem(creative_commons_url, CREATIVE_COMMONS)}
          {this.renderItem(mastodon_url, MASTODON, "FontAwesome5")}
          {this.renderItem(peertube_url, PEERTUBE)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10
  },
  icon: {
    paddingLeft: 14,
    paddingRight: 14
  }
});
