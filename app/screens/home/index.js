import React from "react";
import ReactNative, { StyleSheet } from "react-native";
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
      subHeader: null
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
            this.setState({ refreshing: false, err: false, data, subHeader: data.length });
        })
        .catch(err => {
            this.setState({ refreshing: false, err: true, subHeader: null });
            console.log(err)
        })
  }

  renderIntro = (subHeader) => {
    return (
      <ReactNative.View style={styles.headerView}>
        <ReactNative.Text style={styles.header}>{config.strings.homeScreen.header}</ReactNative.Text>
        {subHeader?
          <ReactNative.Text style={styles.subHeader}>
            {config.strings.homeScreen.subHeaderStart}
            <ReactNative.Text style={styles.subHeaderColor}>{subHeader}</ReactNative.Text> 
            {config.strings.homeScreen.subHeaderEnd}
          </ReactNative.Text>
        :""}
      </ReactNative.View>
    );
  };

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
    <ReactNative.View style={config.styles.containerNoPadding} >
      {this.renderIntro(this.state.subHeader)}
      <ReactNative.SectionList
        refreshing={this.state.refreshing}
        onRefresh={()=>this.getData()}
        sections={[
          {
            data: [1],
            keyExtractor: (item, index) => index,
            renderItem: (item, index) => {
              return(
                <ReactNative.View style={styles.errorView}>
                  <ReactNative.Text style={styles.error}>{ this.state.err ? config.strings.errorLoading : "" }</ReactNative.Text>
                </ReactNative.View>
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
    </ReactNative.View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 20
  },
  header: {
    fontSize: 30,
    fontFamily: config.fonts.titleFont,
    paddingBottom: 6,
    color: config.colors.blackTorn
  },
  subHeader: {
    fontSize: 20,
    fontFamily: config.fonts.bodyFont,
    color: config.colors.blackTorn
  },
  subHeaderColor: {
    fontFamily: config.fonts.titleFont,
    color: config.colors.thinkerGreen
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
