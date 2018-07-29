import TrackPlayer from 'react-native-track-player';

import {
    PLAYBACK_STATE,
    PLAYBACK_TRACK,
    UPDATE_TRACK_INFO,
} from "./types";

export function playbackState(state) {
    return {
        type: PLAYBACK_STATE,
        state
    };
}

export function playbackTrack(track) {
    return {
        type: PLAYBACK_TRACK,
        track
    };
}

export function updateTrackInfo(info) {    
    return {
        type: UPDATE_TRACK_INFO,
        info
    };
}

export function updatePlayback() {
    return async (dispatch, getState) => {
        try {
            dispatch(playbackState(await TrackPlayer.getState()));
            dispatch(playbackTrack(await TrackPlayer.getCurrentTrack()));
        } catch(e) {
            // The player is probably not yet initialized
            // which means we don't have to update anything
            console.log(e);
        }
    };
}
