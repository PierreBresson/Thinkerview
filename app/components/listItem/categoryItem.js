import React from "react";
import ReactNative, { StyleSheet } from "react-native";
import config from "../../config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import _ from "lodash";

export default class CategoryItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { item, onPress, style } = this.props;
    let { name, id } = item;

    if (!name || id == 1) return null;

    return (
      <ReactNative.TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
      >
        <ReactNative.Text numberOfLines={1} style={styles.text}>
          {_.capitalize(name)}
        </ReactNative.Text>
        <MaterialCommunityIcons
          name={"chevron-right"}
          size={22}
          color={config.colors.thinkerGreen}
          style={styles.iconShare}
        />
      </ReactNative.TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: config.colors.thinkerGreen,
    backgroundColor: config.colors.thinkerGreenWashedOut
  },
  text: {
    fontSize: 18,
    fontFamily: config.fonts.bold,
    color: config.colors.thinkerGreen
  }
});
