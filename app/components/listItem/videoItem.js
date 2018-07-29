import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import config from "../../config";
import _ from "lodash";

export default class VideoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { item, onPress, style } = this.props;
    let { title, img_url, video_id } = item;

    if(!title || !video_id)
      return null;

    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
      >
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: img_url ? img_url : '' }}
        />
        <View style={styles.textView}>
          <Text numberOfLines={3} style={styles.text}>
            {_.capitalize(title)}
          </Text>
        </View>
      </TouchableOpacity>
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
  img: {
    height: 63,
    width: 112
  },
  textView: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: config.fonts.bodyFont
  }
});
