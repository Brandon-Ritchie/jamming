import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removetrack = this.removetrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);

    this.state = {
      searchResults: [
        {
          name: 'Test 2',
          artist: 'Test 2',
          album: 'Test 2',
          id: 2
        }
      ],
      playlistName: '',
      playlistTracks: [
        {
        name: 'Test 1',
        artist: 'Test 1',
        album: 'Test 1',
        id: 1
        }
      ]
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

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
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
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
