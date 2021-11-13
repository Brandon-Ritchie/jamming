import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/Tracklist'

export class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} />
        <TrackList 
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
      </div>
    )  
  }
}