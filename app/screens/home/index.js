import React from "react";
import { ActivityIndicator, Text, View, SectionList, StyleSheet } from "react-native";
import * as Components from "../../components";
import config from "../../config";

import getAllPosts from "../../services/api/getAllPosts";
import cleanWPjson from "../../services/staticServices/cleanWPjson";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      refreshing: false,
      err: false,
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ refreshing: true, err: false });
    getAllPosts()
        .then(res => {
            const data = cleanWPjson(res);
            this.setState({ refreshing: false, err: false, data});
        })
        .catch(err => {
            this.setState({ refreshing: false, err: true });
            console.log(err)
        })
  }

  renderIntro = () => {
    return (
      <View style={styles.headerView}>
        <Text style={styles.header}>
          {config.strings.homeScreen.header}
        </Text>
      </View>
    );
  };

  renderActivityIndicator = () => {
    if(!this.state.refreshing)
      return <View/>;
    return (
      <View>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  }

  renderItem = (item, index) => {
    return (
      <Components.default.VideoItem
        item={item}
        onPress={() => {
          this.props.navigation.navigate("Article", { item });
        }}
      />
    );
  };

  render() {
    return (
    <View style={config.styles.containerNoPadding} >
      <SectionList
        refreshing={false}
        onRefresh={()=>this.getData()}
        sections={[
          {
            data: [1],
            keyExtractor: (item, index) => index,
            renderItem: (item, index) => this.renderIntro()
          },
          {
            data: [1],
            keyExtractor: (item, index) => index,
            renderItem: (item, index) => this.renderActivityIndicator()
          },
          {
            data: [1],
            keyExtractor: (item, index) => index,
            renderItem: (item, index) => {
              return(
                <View style={styles.errorView}>
                  <Text style={styles.error}>
                    { this.state.err ? config.strings.errorLoading : "" }
                  </Text>
                </View>
              )
            }
          },
          {
            data: this.state.data ? this.state.data : "",
            keyExtractor: (item, index) => item.id,
            renderItem: (item, index) => 
              this.state.refreshing? <View/> : this.renderItem(item.item, item.index)
          }
        ]}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    fontSize: 28,
    fontFamily: config.fonts.titleFont,
    paddingBottom: 6,
    color: config.colors.blackTorn
  },
  errorView: {
    flex:1, 
    alignItems: "center"
  },
  error: {
    fontSize: 14,
    fontFamily: config.fonts.bodyFont
  },
});
