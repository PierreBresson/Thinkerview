import { AppRegistry } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './routes/App';

AppRegistry.registerComponent('thinkerview', () => App);

TrackPlayer.updateOptions({
    capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO
    ],
});

TrackPlayer.registerEventHandler(require('./player-handler.js'));
