import React from "react";
import ReactNative, { StyleSheet } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import config from "../config";

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareSocialOpen: false
    }
  }

  render() {
    let { header, onPressLeft, onPressRight, share } = this.props;
    return (
        <ReactNative.View style={styles.container}>
            <ReactNative.View style={styles.containerBtnLeft}>
                <ReactNative.TouchableOpacity style={styles.backBtn} onPress={onPressLeft}>
                    <IconEntypo
                        name={"chevron-left"}
                        size={32}
                        color={config.colors.blackTorn}
                        style={styles.iconBack}
                    />
                    <ReactNative.Text style={styles.backText}>{config.strings.headerComponent.back}</ReactNative.Text>
                </ReactNative.TouchableOpacity>
            </ReactNative.View>
            <ReactNative.View style={styles.headerView}>
              {header?<ReactNative.Text numberOfLines={1} style={styles.header}>{header}</ReactNative.Text>:null}
            </ReactNative.View>
            {share?<ReactNative.View style={styles.containerBtnRight}>
              <ReactNative.TouchableOpacity onPress={onPressRight}>
                <IconEntypo
                  name={"share"}
                  size={22}
                  color={config.colors.thinkerGreen}
                  style={styles.iconShare}
                />
              </ReactNative.TouchableOpacity>
            </ReactNative.View>:<ReactNative.View style={styles.containerBtnRight}/>}
        </ReactNative.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: ReactNative.Platform.OS === "ios" ? 40 : 20,
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
