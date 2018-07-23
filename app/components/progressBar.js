import React from "react";

export default class ProgressBar extends TrackPlayer.ProgressComponent {

    render() {
        return (
            <View>
                <Text>{formatTime(this.state.position)}</Text>
                <ProgressBar
                    progress={this.getProgress()}
                    buffered={this.getBufferedProgress()}
                />
            </View>
        );
    }
    
}