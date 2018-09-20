import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import config from "../../config";
import _ from "lodash";

export default (VideoItemFeatured = ({ item, onPress, style }) => {
  let { title, img_url, video_id } = item;

  if (!title || !video_id || !img_url) return null;

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.imgView}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: img_url }}
        />
      </View>
      <View style={styles.textView}>
        <Text numberOfLines={2} style={styles.text}>
          {_.capitalize(title)}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: config.colors.silverTwo
  },
  imgView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    height: 200
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  textView: {
    flex: 1
  },
  text: {
    fontSize: 20,
    fontFamily: config.fonts.bold,
    color: config.colors.black
  }
});
