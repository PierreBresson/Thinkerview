import React from "react";
import { View, SectionList, Text, StyleSheet } from "react-native";
import Header from "../../../components/header";
import VideoItem from "../../../components/listItem/videoItem"
import config from "../../../config";

import getAllPostsFromACategory from "../../../services/api/getAllPostsFromACategory";
import cleanWPjson from "../../../services/staticServices/cleanWPjson";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: 0,
      data: null,
      refreshing: false,
      err: false
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    const category_id = this.props.navigation.getParam("category_id");
    this.setState({ refreshing: true });
    getAllPostsFromACategory(category_id)
        .then(res => {
            this.setState({ refreshing: false, err: false, data: cleanWPjson(res) });
        })
        .catch(err => {
            this.setState({ refreshing: false, err: true });
        })
  }

  renderIntro = () => {
    const category_name = this.props.navigation.getParam("category_name");
    return <Header onPressLeft={()=>this.props.navigation.goBack()} header={category_name}/>;
  };

  renderItem = (item, index) => {
    return (
      <VideoItem
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
      {this.renderIntro()}
      <SectionList
        refreshing={this.state.refreshing}
        onRefresh={()=>this.getData()}
        sections={[
          {
            data: [1],
            keyExtractor: (item, index) => index,
            renderItem: (item, index) => {
              return(
                <View style={styles.errorView}>
                  <Text style={styles.error}>{ this.state.err ? config.strings.errorLoading : "" }</Text>
                </View>
              )
            }
          },
          {
            data: this.state.data ? this.state.data : "",
            keyExtractor: (item, index) => item.id,
            renderItem: (item, index) => this.renderItem(item.item, item.index)
          }
        ]}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  errorView: {
    flex:1, 
    alignItems: "center"
  },
  error: {
    fontSize: 14,
    fontFamily: config.fonts.bodyFont
  },
});
