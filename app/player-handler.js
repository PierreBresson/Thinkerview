import TrackPlayer from 'react-native-track-player';

module.exports = async (data) => {
    if(data.type == 'remote-play') {
        TrackPlayer.play();
    } else if (data.type == 'remote-pause') {
        TrackPlayer.pause();
    } else if(data.type == 'remote-seek') {
        TrackPlayer.seekTo(data.position);
    } else if(data.type == 'remote-jump-foward') {
        TrackPlayer.seekTo(data.position + 15)
    } else if(data.type == 'remote-jump-backward') {
        TrackPlayer.seekTo(data.position - 15)
    }
};