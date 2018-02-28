import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class SongsList extends Component {
    render() {
        console.log(this.props.songs)
        let song = this.props.songs.map((song, i)=>{
            console.log(song)
            return (
                <li key={i}><Link to={`/${i}`}>{song.title}</Link><button onClick={() => { this.props.playSong(i) }}>{(this.props.isPlaying) ? 'Pause' : 'Play'}</button></li>
                
            )
        })
        return (
            <div>
                {song}
            </div>
        )
    }
}

export default SongsList;