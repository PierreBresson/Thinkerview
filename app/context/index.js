import React from 'react';
import config from '../config';
import TrackPlayer from 'react-native-track-player';

//
// Initial State
//

const initialState = {
  toto: 'toto',
  track: {
    id: 'unique track id',
    url: null,
    title: 'title',
    artist: 'subTitle',
    album: 'Interview',
    artwork: config.images.logo,
  },
};

//
// Context...
//

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

let player = TrackPlayer;
export class AppProvider extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = initialState;
    }

    componentDidMount() {
      player.setupPlayer()
    }
    
    playPodcast = (audio_link, img_url, title) => {
      player.reset();
      let track = {
        id: audio_link,
        url: audio_link,
        title: title,
        artist: 'subTitle',
        album: 'Interview',
        artwork: img_url,
      };
      this.setState({ track })
      player.add([track])
        .then(() => {
          player.play();
        })
        .catch(err=>{
          console.log(err)
        });;
    }

    async playPause() {
      let state = await player.getState();
      switch (state) {
        case TrackPlayer.STATE_PAUSED:
          player.play()
          break;
        case TrackPlayer.STATE_PLAYING:
          player.pause()
          break;
        default:
          break;
      }
    }

    async giveStateIcon() {
      let state = await player.getState();
      switch (state) {
        case TrackPlayer.STATE_PAUSED:
          return "controller-pause";
          break;
        case TrackPlayer.STATE_PLAYING:
          return "controller-play";
          break;
        default:
          return "controller-play";
          break;
      }
    }
    
    render() {
      return (
        <AppContext.Provider value={{
          track: this.state.track,
          playPodcast: this.playPodcast,
          playPause: this.playPause,
          giveStateIcon: this.giveStateIcon,
        }}>
          {this.props.children}
        </AppContext.Provider>
      );
    }
  
  }