import React from "react";
import ReactNative, { StyleSheet } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import config from "../config";

export class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { header, onPress } = this.props;
    return (
        <ReactNative.View style={styles.container}>
            <ReactNative.View style={styles.containerBtn}>
                <ReactNative.TouchableOpacity style={styles.backBtn} onPress={onPress}>
                    <IconEntypo
                        name={"chevron-left"}
                        size={32}
                        color={config.colors.black}
                        style={styles.icon}
                    />
                </ReactNative.TouchableOpacity>
            </ReactNative.View>
            <ReactNative.View style={styles.headerView}>
              {header?<ReactNative.Text numberOfLines={1} style={styles.header}>{header}</ReactNative.Text>:null}
            </ReactNative.View>
            <ReactNative.View style={styles.containerBtn}>
            </ReactNative.View>
        </ReactNative.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 40,
    paddingBottom: 10,
  },
  containerBtn: {
      flex: 1
  },
  backBtn: {
      flexDirection: "row"
  },
  icon: {
    paddingLeft: 6
  },
  headerView: {
    alignItems: "center",
    flex:2, 
    paddingTop: 2
  },
  header: {
    fontSize: 22,
    fontFamily: config.fonts.titleFont
  }
});
