import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import {List, ListItem} from 'material-ui/List'

class SongsList extends Component {
    render() {
       
        let song = this.props.songs.map((song, i)=>{
            
            return (
                <List key={i}>
                    <ListItem><IconButton onClick={() => { this.props.playSong(i) }}>{(this.props.isPlaying) ? <FontIcon className="material-icons">pause</FontIcon>
                        : <FontIcon className="material-icons">play_arrow</FontIcon>}
                    </IconButton>
                <Link to={`/${i}`}>{song.title}</Link>
                </ListItem>
                
                </List>
                
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