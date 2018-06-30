import React from "react";
import ReactNative, { StyleSheet } from "react-native";
import config from "../../config";
import _ from "lodash";

export class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { item, onPress, style } = this.props;
    let { name, id } = item;

    if(!name || id ==1 )
      return null;
      
    return (
      <ReactNative.TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        <ReactNative.Text numberOfLines={1} style={styles.text}>{_.capitalize(name)}</ReactNative.Text>
      </ReactNative.TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: config.colors.silverTwo
  },
  text: {
    fontSize: 16,
    fontFamily: config.fonts.bodyFont,   
  },
});
