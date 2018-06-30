import React from "react";
import ReactNative, { StyleSheet } from "react-native";
import config from "../../config";

export class FlatButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { title, onPress, backgroundColor, style, textStyle } = this.props;
    return (
      <ReactNative.TouchableOpacity
        style={[styles.container, style]}
        onPress={onPress}
      >
        <ReactNative.Text style={[styles.text,textStyle]}>
          {this.props.title}
        </ReactNative.Text>
      </ReactNative.TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 8
  },
  text: {
    marginTop: 16,
    marginBottom: 16,
    textAlign: "center",
    fontSize: 16,
    color: config.colors.white,
    fontFamily: config.fonts.bold,    
  }
});
