import {
    PLAYBACK_INIT,
    PLAYBACK_STATE,
    PLAYBACK_TRACK,
    UPDATE_TRACK_INFO
} from "../actions/types";

import TrackPlayer from 'react-native-track-player';
import config from '../config'

const initialPlayerReducer = {
    init: null,
    player_state: TrackPlayer.STATE_PAUSED,
    track: {
        title: config.strings.podcastScreen.title,
        url: null,
        artwork: null
    }
}

export default playerReducer = (state = initialPlayerReducer, action) => {
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
        case UPDATE_TRACK_INFO:
            return {
                ...state,
                track: action.info
            };
        default:
            return state;
    }
}
