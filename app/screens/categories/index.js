import React from "react";
import ReactNative, { StyleSheet } from "react-native";
import * as Components from "../../components";
import config from "../../config";

import getAllCategories from "../../services/api/getAllCategories";

export default class CategoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      refreshing: false,
      err: false
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData = () => {
    this.setState({ refreshing: true, err: false });
    getAllCategories()
        .then(res => {
            this.setState({ refreshing: false, data: res });
        })
        .catch(err => {
            this.setState({ refreshing: false, err: true });
            console.log(err)
        })
  }

  renderIntro = () => {
    return (
      <ReactNative.View style={styles.headerView}>
        <ReactNative.Text style={styles.header}>{config.strings.categoryScreen.header}</ReactNative.Text>
      </ReactNative.View>
    );
  };

  renderItem = (item,index) => {      
    return(
      <Components.default.CategoryItem
        item={item}
        onPress={()=>{this.props.navigation.navigate("Category", { category_id: item.id, category_name: item.name })}}
      />
    );
  };

  render() {
    return (
      <ReactNative.View style={config.styles.containerNoPadding} >
        {this.renderIntro()}
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
              data: this.state.data?this.state.data:"",
              keyExtractor: (item, index) => item.id,
              renderItem: (item, index) =>
                this.renderItem(item.item, item.index)
            }
          ]}
        />
      </ReactNative.View>
    );
  }
}

const styles = StyleSheet.create({
    headerView: { 
        alignItems: "center", 
        justifyContent: "center", 
        paddingTop: ReactNative.Platform.OS === "ios" ? 60 : 30, 
        paddingBottom: 30 
    },
    header: {
        fontSize: 30,
        fontFamily: config.fonts.titleFont 
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