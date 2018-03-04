import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';
import axios from 'axios'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton'
import LinearProgress from 'material-ui/LinearProgress'
import AudioSpectrum from 'react-audio-spectrum'




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
   }

   changeTime=(e)=>{
    let targetTime = (e.clientX / window.innerWidth) * this.audioPlayer.duration
    this.audioPlayer.currentTime = targetTime
   }

  componentDidUpdate(prevProps, prevState){
    if (prevState.currentSong !== this.state.currentSong){
    this.audioPlayer.load()
    }
    this.state.isPlaying ? this.audioPlayer.play() : this.audioPlayer.pause()
  }

  componentDidMount(){
    axios.get('http://localhost:8080/songs')
    .then((res)=>{
      this.setState({
        songs: res.data
      })
    })
  }
  
  render() {
    const styles = {
      DivWrap: {
        textAlign: 'center'
      },
      playButton: {
        fontSize: '50px'
      },
      skipButton: {
        fontSize: '40px'
      }
    }
      return (
        this.state.songs.length > 0 &&( 
      <div className="App">  
        
        <Route exact path="/" render={(props)=><SongsList playSong={this.playSong} isPlaying={this.state.isPlaying} songs={this.state.songs} msg={'this is how we pass props in react router'}/>}/>
            <div style={styles.DivWrap}><h3>{this.state.songs[this.state.currentSong].title}</h3></div>
            <div style={styles.DivWrap}>
              <AudioSpectrum
                id="audio-canvas"
                height={400}
                width={600}
                audioId={'audio-element'}
                capColor={'blue'}
                capHeight={2}
                meterWidth={2}
                meterCount={512}
                meterColor={[
                  { stop: 0, color: 'grey' },
                  { stop: 0.5, color: 'black' },
                  { stop: 1, color: 'green' }
                ]}
                gap={4}
              />
              </div>

            <LinearProgress mode="determinate" onClick={(e)=>{this.changeTime(e)}}value={this.state.currentTime}/>
            <div style={styles.DivWrap}>
            <p>Currently Playing: {this.state.songs[this.state.currentSong].title}</p>
             <IconButton disabled={this.state.currentSong === 0} onClick={() => { this.changeSong(-1) }}>
                <FontIcon className="material-icons" style={{ fontSize: '40px' }} >skip_previous</FontIcon>
            </IconButton>
              <IconButton onClick={this.play}>{(this.state.isPlaying) ?
                <FontIcon className="material-icons" style={styles.playButton}>pause</FontIcon>
                : <FontIcon className="material-icons" style={styles.playButton}>play_arrow</FontIcon>}</IconButton>
              <IconButton disabled={this.state.currentSong === this.state.songs.length - 1} onClick={() => { this.changeSong(1) }}> <FontIcon className="material-icons" style={{ fontSize: '40px' }} >skip_next</FontIcon> </IconButton>
            </div>
            
            
            
            <audio id="audio-element" ref={(self) => { this.audioPlayer = self }}
            onTimeUpdate={this.updateTime}>
              
              <source src={this.state.songs[this.state.currentSong].source} />
            </audio>
            <Route path='/:songId' render={(props) => <SongDetails songs={this.state.songs} isPlaying={this.state.isPlaying} playSong={this.playSong} {...props} />} />
           

        </div>
       
        )   
    )
  }
}

export default App;
