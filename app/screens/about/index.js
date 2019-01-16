import React from "react";
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import DisplayNetwork from "../../components/displayNetwork";
import config from "../../config";

export default class AboutScreen extends React.Component {
  render() {
    return (
      <ScrollView style={config.styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.header}>{config.strings.aboutScreen.about}</Text>
        </View>

        <Text style={styles.body}>
          {config.strings.aboutScreen.aboutAuthor}
        </Text>
        <DisplayNetwork
          twitter_url={config.urls.links.author.twitter}
          website_url={config.urls.links.author.website}
          github_url={config.urls.links.author.github}
        />

        <View style={styles.subHeaderView}>
          <Text style={styles.subHeader}>
            {config.strings.aboutScreen.thinkerview}
          </Text>
        </View>

        <Text style={styles.body}>
          {config.strings.aboutScreen.thinkerviewDescription}
        </Text>

        <DisplayNetwork
          facebook_url={config.urls.links.thinkerview.facebook}
          twitter_url={config.urls.links.thinkerview.twitter}
          youtube_url={config.urls.links.thinkerview.youtube}
          website_url={config.urls.links.thinkerview.website}
          paypal_url={config.urls.links.thinkerview.tipeee}
        />

        <DisplayNetwork
          mastodon_url={config.urls.links.thinkerview.mastodon}
          peertube_url={config.urls.links.thinkerview.peertube}
        />

        <View style={styles.subHeaderView}>
          <Text style={styles.subHeader}>
            {config.strings.aboutScreen.licence}
          </Text>
        </View>

        <Text style={styles.body}>
          {config.strings.aboutScreen.licenceDescription}
        </Text>

        <DisplayNetwork
          creative_commons_url={config.urls.links.licence.creative_commons}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center"
  },
  header: {
    fontSize: 30,
    fontFamily: config.fonts.titleFont,
    color: config.colors.black
  },
  subHeaderView: {
    paddingTop: 30,
    paddingBottom: 10
  },
  subHeader: {
    fontSize: 20,
    fontFamily: config.fonts.titleFont,
    color: config.colors.black
  },
  body: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    fontFamily: config.fonts.bodyFont
  }
});
