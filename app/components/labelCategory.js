import React from "react";
import { Text, StyleSheet } from "react-native";
import config from "../config";

export default (LabelCategory = ({ category }) => (
  <Text style={styles.text}>{category.toUpperCase()}</Text>
));

const styles = StyleSheet.create({
  text: {
    marginTop: 4,
    color: config.colors.thinkerGreen,
    fontSize: 12,
    fontFamily: config.fonts.bodyFont,
    paddingRight: 4,
    zIndex: 1
  }
});
