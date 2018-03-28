import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      currentVolume: 0,
      maxVolume: 100,
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  componentDidMount(){
    this.eventListeners = {
      timeupdate: e => {
        this.setState({
          currentTime: this.audioElement.currentTime
        });
      },
      durationchange: e => {
        this.setState({
          duration: this.audioElement.duration
        });
      },
      volumeupdate: e => {
        this.setState({
          currentVolume: this.audioElement.currentVolume
        });
      },
      volumechange: e => {
        this.setState({
          maxVolume: this.audioElement.maxVolume
        });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
    this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
  }

  componentWillUnmount(){
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
    this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
  }

  play() {
    this.audioElement.play();
    this.setState( { isPlaying: true } );
  }

  pause() {
    this.audioElement.pause();
    this.setState( { isPlaying: false } );
  }

  setSong(song){
    this.audioElement.src = song.audioSrc;
    this.setState( { currentSong: song } );
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause(song);
    } else {
      if (!isSameSong) { this.setSong(song) }
      this.play(song);
    }
  }

  handlePrevClick(song) {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick(song) {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    if(newIndex < 5){
      this.setSong(newSong);
      this.play(newSong);
    }
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({
      currentTime: newTime
    });
  }

  handleVolumeChange(e) {
    this.audioElement.volume = e.target.value;
    this.setState({
      currentVolume: e.target.value
    });
  }

  formatTime(time) {
    return time ? `${Math.floor(time / 60)}:${Number(time % 60 / 100).toFixed(2).substr(2, 3)}` : '-:--';
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo} {this.state.album.label} </div>
          </div>
        </section>
        <table id="song-list">
          <colgroup className= {this.state.isPlaying ? 'playing': 'paused'}>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <div id="songlist">
            <tbody>
              {this.state.album.songs.map((song, index ) =>
                <tr className= { this.state.isPlaying = this.state.currentSong === song ? "playing" : "paused" } key={index} onClick={() => this.handleSongClick(song)} >
                  <td>
                    <button id="play-pause">
                      <span className="song-number">{index + 1} : </span>
                      <span className="ion-play"> </span>
                      <span className="ion-pause"></span>
                    </button>
                  </td>
                  <td className="song-title"> {song.title} - </td>
                  <td className="song-duration"> {this.formatTime(song.duration)} </td>
                </tr>
              )}
            </tbody>
          </div>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          currentVolume={this.audioElement.currentVolume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
          formatTime={(time) => this.formatTime(time)}
        />
      </section>
    );
  }
}

export default Album;
