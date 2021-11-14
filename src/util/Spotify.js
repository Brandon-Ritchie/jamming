let clientID = '1ddf706dd05b4d31ac296a0e99410ac5';
let redirectURI = "http://localhost:3000/";

let accessToken;

export const Spotify = {
  
  getAccessToken() {

    if (accessToken) {

      return accessToken;

    }
    
    // Check for access token match

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {

      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;

    } else {
      
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;

    };
  },

  async search(term) {
    
    accessToken = Spotify.getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const jsonResponse = await response.json();

      if (!jsonResponse.tracks) {
      return [];
      }
    
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
  },

  async savePlaylist(playlistName, trackURIs) {

    if(!playlistName || !trackURIs) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    const response = await fetch(
      `https://api.spotify.com/v1/me/playlists`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify({ name: playlistName })
    });
    const jsonResponse = await response.json();
    const playlistId = jsonResponse.id;
    return await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ uris: trackURIs })
      }
    );
  }
};