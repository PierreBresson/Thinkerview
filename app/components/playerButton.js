import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import config from "../config";

export default class PlayerButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { iconName, onPress } = this.props;
    if(iconName=="forward-10"||iconName=="replay-10") { 
      return (
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={onPress}
        >
          <MaterialIcons
            name={iconName}
            size={46}
            color={config.colors.blackTorn}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={onPress}
        >
          <IconEntypo
            name={iconName}
            size={46}
            color={config.colors.blackTorn}
          />
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  controlBtn: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
