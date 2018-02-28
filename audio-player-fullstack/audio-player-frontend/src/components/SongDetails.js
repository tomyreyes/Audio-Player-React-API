import React, {Component} from 'react';

class SongDetails extends Component {
    render() {
        console.log(this.props.songs)
        console.log(this.props.match.params)
        return (
            <div>
            <h1>{this.props.songs[this.props.match.params.songId].title}</h1>
            <p>{this.props.songs[this.props.match.params.songId].description}</p>
                <button onClick={() => { this.props.playSong(Number(this.props.match.params.songId)) }}>{(this.props.isPlaying) ? 'Pause' : 'Play'}</button>
            </div>
        )
    }
}

export default SongDetails;