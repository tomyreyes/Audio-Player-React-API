import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';
import axios from 'axios'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import LinearProgress from 'material-ui/LinearProgress'



class App extends Component {
  constructor() {
    super()
    this.state = {
      songs: [],
      currentSong: 0,
      isPlaying: false,
      currentTime: 0
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
  updateTime = () => {
    
    this.setState({currentTime: this.audioPlayer.currentTime / this.audioPlayer.duration * 100})
  //     currentTime: this.audioPlayer.currentTime / this.audioPlayer.duration
  //     // currentTime: this.audioPlayer.duration - this.audioPlayer.currentTime //time remaining
  //   })
   }

   changeTime=(e)=>{
     console.log(e.clientX)
     console.log(window.innerWidth)
    let targetTime = (e.clientX / window.innerWidth) * this.audioPlayer.duration
    console.log(targetTime)
    this.audioPlayer.currentTime = targetTime
   }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.song !== this.props.song){
    this.audioPlayer.load()
    }
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
        
        <Route exact path="/" render={(props)=><SongsList playSong={this.playSong} isPlaying={this.state.isPlaying} songs={this.state.songs} msg={'this is how we pass props in react router'}/>}/>
        <Route path='/:songId' render={(props) => <SongDetails songs={this.state.songs} isPlaying={this.state.isPlaying} playSong={this.playSong} {...props}/>}/>
            <h1>{this.state.songs[this.state.currentSong].title}</h1>

            <LinearProgress mode="determinate" onClick={(e)=>{this.changeTime(e)}}value={this.state.currentTime}/>
            
            <IconButton onClick={this.play}>{(this.state.isPlaying) ?
              <FontIcon className="material-icons">pause</FontIcon>
              : <FontIcon className="material-icons">play_arrow</FontIcon>}</IconButton>
            <IconButton disabled={this.state.currentSong === 0} onClick={() => { this.changeSong(-1) }}>
              <FontIcon className="material-icons">skip_previous</FontIcon>
            </IconButton>
            <IconButton disabled={this.state.currentSong === this.state.songs.length - 1} onClick={() => { this.changeSong(1) }}> <FontIcon className="material-icons">skip_next</FontIcon> </IconButton>
            
            
            
            <audio ref={(self) => { this.audioPlayer = self }}
            onTimeUpdate={this.updateTime}>

              <source src={this.state.songs[this.state.currentSong].source} />
            </audio>

        </div>
       
        )   
    )
  }
}

export default App;
