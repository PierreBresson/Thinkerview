import React, { Component } from "react";
import ReactNative, { StyleSheet } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { AppProvider } from '../context/';
import config from "../config";

import HomeScreen from "../screens/home";
import CategoriesScreen from "../screens/categories";
import CategoryScreen from "../screens/categories/category";
import PodcastScreen from "../screens/podcast"
import AboutScreen from "../screens/about";

import ArticleScreen from "../screens/sharedScreens/article";

// Temporary fix for not show a warning due to react navigation
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Remote debugger is in a background tab which may cause apps to perform slowly']);
console.ignoredYellowBox = ['Remote debugger'];

const TabScreens = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator(
        {
          Home: {
            screen: HomeScreen,
          },
          Article: {
            screen: ArticleScreen
          },
          AboutScreen: {
            screen: AboutScreen
          }
        },
        {
          headerMode: "none",
          header: null,
          navigationOptions: {
            header: null
          }
        }
      ),
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) =>
          focused ? (
            <IconEntypo
              name={"folder-video"}
              size={28}
              color={config.colors.thinkerGreen}
              style={styles.icon}
            />
          ) : (
            <IconEntypo
              name={"folder-video"}
              size={28}
              color={config.colors.blackTorn}
              style={styles.icon}
            />
          )
      }
    },
    Categories: {
      screen: createStackNavigator(
        {
          Categories: {
            screen: CategoriesScreen,
          },
          Category: {
            screen: CategoryScreen
          },
          Article: {
            screen: ArticleScreen
          }
        },
        {
          headerMode: "none",
          header: null,
          navigationOptions: {
            header: null
          }
        }
      ),
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) =>
          focused ? (
            <IconEntypo
              name={"list"}
              size={28}
              color={config.colors.thinkerGreen}
              style={styles.icon}
            />
          ) : (
            <IconEntypo
              name={"list"}
              size={28}
              color={config.colors.blackTorn}
              style={styles.icon}
            />
          )
      }
    },
    Podcast: {
      screen: PodcastScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) =>
          focused ? (
            <FontAwesome
              name={"podcast"}
              size={28}
              color={config.colors.thinkerGreen}
              style={styles.icon}
            />
          ) : (
            <FontAwesome
              name={"podcast"}
              size={28}
              color={config.colors.blackTorn}
              style={styles.icon}
            />
          )
      }
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) =>
          focused ? (
            <IconEntypo
              name={"info-with-circle"}
              size={28}
              color={config.colors.thinkerGreen}
              style={styles.icon}
            />
          ) : (
            <IconEntypo
              name={"info-with-circle"}
              size={28}
              color={config.colors.blackTorn}
              style={styles.icon}
            />
          )
      }
    },
  },
  {
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      pressColor: config.colors.darkBlue,
      renderIndicator: () => null,
      style: {
        backgroundColor: config.colors.white,
        borderTopColor: config.colors.white,
        shadowOpacity: 0.1,
        shadowColor: config.colors.black
      }
    }
  }
);

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <AppProvider>
        <TabScreens />
      </AppProvider>
    );
  }
}

const marginIosIconTab = 10;
const styles = StyleSheet.create({
  icon: {
    flexShrink: 1,
    ...ReactNative.Platform.select({
      ios: {
        marginTop: marginIosIconTab,
        marginBottom: marginIosIconTab
      }
    })
  }
});