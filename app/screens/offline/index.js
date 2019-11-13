import React from "react";
import { FlatList, Text, View, ScrollView, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { selectOfflinePodcast, updatePodcast } from "../../actions";
import VideoItem from "../../components/listItem/videoItem";
import config from "../../config";

class OfflineScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.offline.data
    };
  }

  renderNoPodcast = () => {
    return (
      <View style={styles.content}>
        <Text style={styles.body}>
          {config.strings.offlineScreen.nothingToShow}
        </Text>
      </View>
    );
  };

  renderPodcast = () => (
    <FlatList
      data={this.props.offline.data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <VideoItem
          key={item.id}
          item={item}
          onPress={() => {
            this.props.selectOfflinePodcast(item);
            this.props.navigation.navigate("OfflinePodcast");
          }}
        />
      )}
    />
  );

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.offline.data && nextState.data) {
      if (nextProps.offline.data.length != nextState.data.length) {
        this.setState({
          data: nextProps.offline.data
        });
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <ScrollView style={config.styles.containerNoPadding}>
        <View style={styles.headerView}>
          <Text style={styles.header}>
            {config.strings.offlineScreen.title}
          </Text>
        </View>
        {this.props.offline.data.length
          ? this.renderPodcast()
          : this.renderNoPodcast()}
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
  return {
    updatePodcast: (id, key, value) => dispatch(updatePodcast(id, key, value)),
    selectOfflinePodcast: podcast => dispatch(selectOfflinePodcast(podcast))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfflineScreen);
