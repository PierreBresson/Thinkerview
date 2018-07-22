import TrackPlayer from 'react-native-track-player';
// import { loadTracks } from './utils';

// export const UPDATE_LIBRARY = 'UPDATE_LIBRARY';
// export const LIBRARY_STATUS = 'LIBRARY_STATUS';

export const PLAYBACK_INIT = 'PLAYBACK_INIT';
export const PLAYBACK_STATE = 'PLAYBACK_STATE';
export const PLAYBACK_TRACK = 'PLAYBACK_TRACK';

export const UPDATE_TRACK_INFO = 'UPDATE_TRACK_INFO';

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
