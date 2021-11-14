import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import React from 'react';
import { Spotify } from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removetrack = this.removetrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    }
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      this.setState(prevState => ({
        playlistTracks: [...prevState.playlistTracks, track]
      }));
    }
  }

  removetrack(track) {
    const newArray = this.state.playlistTracks.filter(playlistTrack => playlistTrack !== track);
    this.setState({
      playlistTracks: newArray
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    const playlistName = this.state.playlistName;
    Spotify.savePlaylist(playlistName, trackURIs)
    .then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: []
      });
    });
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removetrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
