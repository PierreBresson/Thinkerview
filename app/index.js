import React, { PureComponent } from "react";
import { AppState, Platform, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import IconEntypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import getRootReducer from "./reducers";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { updatePlayback } from "./actions/playerActions";
import { interviewsScrollToTop } from "./actions/interviewsActions";
import config from "./config";

import HomeScreen from "./screens/home";
import PodcastScreen from "./screens/podcast";
import OfflineScreen from "./screens/offline";
import AboutScreen from "./screens/about";

import ArticleScreen from "./screens/home/article";
import OfflinePodcastScreen from "./screens/offline/podcast";

// Temporary fix for not show a warning due to react navigation
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Module RCTImageLoader",
  "Remote debugger is in a background tab which may cause apps to perform slowly"
]);
console.ignoredYellowBox = ["Remote debugger"];

const TabScreens = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator(
        {
          Home: {
            screen: HomeScreen,
            path: "home"
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
      navigationOptions: ({ navigation }) => ({
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
          ),
        tabBarOnPress: ({ navigation }) => {
          if (navigation.isFocused()) {
            App.store.dispatch(interviewsScrollToTop());
          } else {
            navigation.navigate("Home");
          }
        }
      })
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
    Offline: {
      screen: createStackNavigator(
        {
          Offline: {
            screen: OfflineScreen
          },
          OfflinePodcast: {
            screen: OfflinePodcastScreen
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
              name={"download"}
              size={28}
              color={config.colors.thinkerGreen}
              style={styles.icon}
            />
          ) : (
            <IconEntypo
              name={"download"}
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
    }
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

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["navigation", "player", "interviews", "article", "categories"]
};

const persistedReducer = persistReducer(persistConfig, getRootReducer());

class App extends PureComponent {
  static store = createStore(
    persistedReducer,
    applyMiddleware(logger, thunkMiddleware)
  );
  static persistor = persistStore(App.store);

  async componentDidMount() {
    AppState.addEventListener("change", this._handleStateChange);

    // TODO remove temp code
    await TrackPlayer.setupPlayer({});
    TrackPlayer.updateOptions({
      jumpInterval: 15,
      stopWithApp: false,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        TrackPlayer.CAPABILITY_JUMP_FORWARD
      ]
    });
  }

  async componentWillUnmount() {
    AppState.removeEventListener("change", this._handleStateChange);
  }

  _handleStateChange(appState) {
    if (appState == "active") {
      // Updates the playback information when the app is back from background mode
      App.store.dispatch(updatePlayback());
    }
  }

  render() {
    return (
      <Provider store={App.store}>
        <PersistGate loading={null} persistor={App.persistor}>
          <TabScreens />
        </PersistGate>
      </Provider>
    );
  }
}

const marginIosIconTab = 10;
const styles = StyleSheet.create({
  icon: {
    flexShrink: 1,
    ...Platform.select({
      ios: {
        marginTop: marginIosIconTab,
        marginBottom: marginIosIconTab
      }
    })
  }
});

import { AppRegistry } from "react-native";
import TrackPlayer from "react-native-track-player";

import createEventHandler from "./player-handler";

AppRegistry.registerComponent("thinkerview", () => App);
TrackPlayer.registerEventHandler(createEventHandler(App.store));
