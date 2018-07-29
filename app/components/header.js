import React from "react";
import { Platform, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import config from "../config";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareSocialOpen: false
    }
  }

  render() {
    let { header, onPressLeft, onPressRight, share } = this.props;
    return (
        <View style={styles.container}>
            <View style={styles.containerBtnLeft}>
                <TouchableOpacity style={styles.backBtn} onPress={onPressLeft}>
                    <IconEntypo
                        name={"chevron-left"}
                        size={32}
                        color={config.colors.blackTorn}
                        style={styles.iconBack}
                    />
                    <Text style={styles.backText}>{config.strings.headerComponent.back}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.headerView}>
              {header?<Text numberOfLines={1} style={styles.header}>{header}</Text>:null}
            </View>
            {share?<View style={styles.containerBtnRight}>
              <TouchableOpacity onPress={onPressRight}>
                <IconEntypo
                  name={"share"}
                  size={22}
                  color={config.colors.thinkerGreen}
                  style={styles.iconShare}
                />
              </TouchableOpacity>
            </View>:<View style={styles.containerBtnRight}/>}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Platform.OS === "ios" ? 40 : 20,
    paddingBottom: 10,
  },
  containerBtnLeft: {
    flex: 1,
  },
  containerBtnRight: {
    flex: 1,
    paddingTop: 4,
    alignItems: "flex-end",
  },
  backBtn: {
      flexDirection: "row"
  },
  iconBack: {
    paddingLeft: 6
  },
  iconShare: {
    paddingRight: 12
  },
  headerView: {
    alignItems: "center",
    flex:2, 
    paddingTop: 2
  },
  header: {
    alignItems: "center",
    fontSize: 22,
    fontFamily: config.fonts.titleFont,
    color: config.colors.blackTorn
  },
  backText: {
    paddingTop: 8,
    fontSize: 16,
    fontFamily: config.fonts.bodyFont,
    color: config.colors.blackTorn
  }
});
