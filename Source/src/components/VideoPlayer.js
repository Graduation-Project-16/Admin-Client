import React from 'react';
import videojs from 'video.js';
import '../assets/css/video-js.css'
import 'videojs-flash'

export default class VideoPlayer extends React.Component {
    componentDidMount () {
        this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
            console.log('onPlayerReady', this);
        });

    }

    componentWillMount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render(){
        return (
            <div>
                <div data-vis-player>
                    <video style={{width: 'auto'}} ref={node => this.videoNode = node} className="video-js"></video>
                </div>
            </div>
        )
    }
}