import TrackPlayer from 'react-native-track-player';

module.exports = async (data) => {
    if(data.type == 'remote-play') {
        // The play button was pressed, we can forward this command to the player using
        TrackPlayer.play();
    } else if (data.type == 'remote-stop') {
        // The stop button was pressed, we can stop the player
        TrackPlayer.stop();
    } else if (data.type == 'remote-pause') {
        // The play button was pressed, we can forward this command to the player using
        TrackPlayer.pause();
    } else if(data.type == 'remote-seek') {
        // Again, we can forward this command to the player using
        TrackPlayer.seekTo(data.position);
    }
};