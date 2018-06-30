import React from "react";
import ReactNative, { StyleSheet } from "react-native";
import * as Components from "../../components";
import config from "../../config";

export default class AboutScreen extends React.Component {
  render() {
    return (
      <ReactNative.ScrollView style={config.styles.container}>
        <ReactNative.View style={styles.headerView}>
          <ReactNative.Text style={styles.header}>{config.strings.aboutScreen.about}</ReactNative.Text>
        </ReactNative.View>

        <ReactNative.Text style={styles.body}>{config.strings.aboutScreen.aboutAuthor}</ReactNative.Text>
        <Components.default.DisplayNetwork
          twitter_url={config.urls.links.author.twitter}
          website_url={config.urls.links.author.website}
          github_url={config.urls.links.author.github}
        />

        <ReactNative.View style={styles.subHeaderView}>
          <ReactNative.Text style={styles.subHeader}>{config.strings.aboutScreen.thinkerview}</ReactNative.Text>
        </ReactNative.View>

          <ReactNative.Text style={styles.body}>
            {config.strings.aboutScreen.thinkerviewDescription}
          </ReactNative.Text>

          <Components.default.DisplayNetwork
            facebook_url={config.urls.links.thinkerview.facebook}
            twitter_url={config.urls.links.thinkerview.twitter}
            youtube_url={config.urls.links.thinkerview.youtube}
            website_url={config.urls.links.thinkerview.website}
            paypal_url={config.urls.links.thinkerview.tipeee}
          />

        <ReactNative.View style={styles.subHeaderView}>
          <ReactNative.Text style={styles.subHeader}>
            {config.strings.aboutScreen.licence}
          </ReactNative.Text>
        </ReactNative.View>

        <ReactNative.Text style={styles.body}>
          {config.strings.aboutScreen.licenceDescription}
        </ReactNative.Text>

        <Components.default.DisplayNetwork creative_commons_url={config.urls.links.licence.creative_commons}/>

      </ReactNative.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    paddingTop: 60,
    paddingBottom: 10
  },
  header: {
    fontSize: 30,
    fontFamily: config.fonts.titleFont
  },
  subHeaderView: {
    paddingTop: 30,
    paddingBottom: 10
  },
  subHeader: {
    fontSize: 20,
    fontFamily: config.fonts.titleFont
  },
  body: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    fontFamily: config.fonts.bodyFont
  },
});
