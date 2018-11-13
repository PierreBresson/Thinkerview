import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import config from "../../config";

class OfflineScreen extends React.Component {
  renderNoPodcast = () => (
    <Text style={styles.body}>
      {config.strings.offlineScreen.nothingToShow}
    </Text>
  );

  render() {
    return (
      <ScrollView style={config.styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.header}>
            {config.strings.offlineScreen.title}
          </Text>
        </View>
        <View style={styles.content}>{this.renderNoPodcast()}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: "center"
  },
  header: {
    fontSize: 30,
    fontFamily: config.fonts.titleFont,
    color: config.colors.black
  },
  content: {
    flex: 1,
    alignItems: "center"
  },
  body: {
    fontSize: 14,
    fontFamily: config.fonts.bodyFont
  }
});

function mapStateToProps(state) {
  return { offline: state.offline };
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfflineScreen);
