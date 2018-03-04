import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'


class SongDetails extends Component {
    render() {
        const styles = {
            DivWrap: {
                textAlign: 'center'
            }
        }
       
        return (
            <div style={styles.DivWrap}>
            <h1>{this.props.songs[this.props.match.params.songId].title}</h1>
            <p>{this.props.songs[this.props.match.params.songId].description}</p>
                <div style={styles.DivWrap}>
                <IconButton onClick={() => { this.props.playSong(Number(this.props.match.params.songId)) }}>{(this.props.isPlaying) ?
                    <FontIcon className="material-icons">pause</FontIcon>
                    : <FontIcon className="material-icons">play_arrow</FontIcon>}</IconButton>
                    </div>

            </div>
        )
    }
}

export default SongDetails;