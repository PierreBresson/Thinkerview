import React from "react";
import { View, Text, StyleSheet } from "react-native";
import config from "../config";

export default (LabelCategory = ({ category }) => (
  <View style={styles.tagView}>
    <Text style={styles.text}>{category}</Text>
  </View>
));

const styles = StyleSheet.create({
  tagView: {
    backgroundColor: config.colors.thinkerGreen,
    marginRight: 10,
    paddingTop: 4,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20
  },
  text: {
    color: "white",
    fontSize: 12,
    fontFamily: config.fonts.bodyFont
  }
});
