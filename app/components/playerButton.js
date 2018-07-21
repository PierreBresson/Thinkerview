import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import config from "../config";

export class PlayerButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sizeIcon = 46;
    let { iconName, onPress} = this.props;
    if(iconName=="controller-play"||iconName=="controller-pause")
      sizeIcon = 60;
    return (
      <TouchableOpacity
        style={styles.controlBtn}
        onPress={onPress}
      >
        <IconEntypo
          name={iconName}
          size={sizeIcon}
          color={config.colors.blackTorn}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  controlBtn: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
