import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Foundation from "react-native-vector-icons/Foundation";
import config from "../config";

export default (button = ({ onPress, message, iconName }) => {
  let icon = null;
  if (iconName) {
    icon = (
      <Foundation
        name={iconName}
        size={20}
        color={config.colors.thinkerGreen}
        style={styles.icon}
      />
    );
  }
  if (onPress && message) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.text}>{message}</Text>
        {icon}
      </TouchableOpacity>
    );
  }

  return null;
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: config.colors.thinkerGreen,
    borderWidth: 2.5,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  text: {
    color: config.colors.thinkerGreen,
    fontSize: 18,
    fontFamily: config.fonts.bold
  },
  icon: {
    marginLeft: 10
  }
});
