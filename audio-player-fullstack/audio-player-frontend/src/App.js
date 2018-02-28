import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';
import axios from 'axios'
import {Button} from 'grommet/components/button'

class App extends Component {
  constructor() {
    super()
    this.state = {
      songs: [],
      currentSong: 0,
      isPlaying: false 
    }
  }

  changeSong = (index) => {
    this.setState({
      currentSong: this.state.currentSong + index
  })
}

  playSong = (songId)=>{
    this.setState({
      currentSong: songId,
      isPlaying: !this.state.isPlaying
    })
  }

  play = ()=>{ 
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  componentDidUpdate(){
    this.audioPlayer.load()
    this.state.isPlaying ? this.audioPlayer.play() : this.audioPlayer.pause()
  }

  componentDidMount(){
    axios.get('http://localhost:8080/songs')
    .then((res)=>{
      console.log(res.data)
      this.setState({
        songs: res.data
      })
    })
  }
  

  render() {
    // console.log(this.state.songs[0].title)
      return (
        this.state.songs.length > 0 &&( 

      <div className="App">
      <h1>{this.state.songs[this.state.currentSong].title}</h1>
        <audio controls ref={(self) => {this.audioPlayer = self}}>
          <source src={this.state.songs[this.state.currentSong].source} />
        </audio>
        <Button type="button" primary={true} onClick={this.play}>{(this.state.isPlaying) ? 'Pause':'Play'}</Button>
        <button type="button" disabled={this.state.currentSong === 0} onClick={() => { this.changeSong(-1) }}>Previous</button>
        <button type="button" disabled={this.state.currentSong === this.state.songs.length - 1} onClick={() => { this.changeSong(1) }}>Next</button>
        <Route exact path="/" render={(props)=><SongsList playSong={this.playSong} isPlaying={this.state.isPlaying} songs={this.state.songs} msg={'this is how we pass props in react router'}/>}/>
        <Route path='/:songId' render={(props) => <SongDetails songs={this.state.songs} isPlaying={this.state.isPlaying} playSong={this.playSong} {...props}/>}/>
        </div> )
    );
  }
}

export default App;
