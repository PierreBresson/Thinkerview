import { combineReducers } from 'redux';
import {
    PLAYBACK_INIT,
    PLAYBACK_STATE,
    PLAYBACK_TRACK,
    UPDATE_TRACK_INFO
} from './actions';
import TrackPlayer from 'react-native-track-player';
import config from '../config'

const initialStatePlaybackReducer = {
    init: null,
    player_state: TrackPlayer.STATE_PAUSED
}

function playbackReducer(state = initialStatePlaybackReducer, action) {
    switch(action.type) {
        case PLAYBACK_INIT:
            return {
                ...state,
                init: true
            };
        case PLAYBACK_STATE:
            return {
                ...state,
                player_state: action.state
            };
        case PLAYBACK_TRACK:
            return {
                ...state,
                currentTrack: action.track
            };
        default:
            return state;
    }
}

const initialTrackReducer = {
    title: config.strings.podcastScreen.title,
    subTitle: config.strings.podcastScreen.subTitle,
    url: null,
    artwork: config.strings.articleScreen.playVideo
}

function trackReducer(state = initialTrackReducer, action) {
    switch(action.type) {
        case UPDATE_TRACK_INFO:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            };
        default:
            return state;
    }
}

module.exports = combineReducers({
    playback: playbackReducer,
    track: trackReducer,
});
