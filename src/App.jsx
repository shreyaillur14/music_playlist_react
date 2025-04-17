import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import PlaylistForm from './components/PlaylistForm/PlaylistForm'
import PlaylistList from './components/PlaylistList/PlaylistList'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'

function App() {
  // State to store all playlists
  const [playlists, setPlaylists] = useState(() => {
    const savedPlaylists = localStorage.getItem('musicPlaylists');
    return savedPlaylists ? JSON.parse(savedPlaylists) : [
      {
        id: 1,
        name: 'My Favorites',
        songs: [
          { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55' },
          { id: 2, title: 'Hotel California', artist: 'Eagles', duration: '6:30' }
        ]
      }
    ];
  });
  
  // State to keep track of the currently selected playlist
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  
  // State for the currently playing song
  const [currentSong, setCurrentSong] = useState(null);

  // Save playlists to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('musicPlaylists', JSON.stringify(playlists));
  }, [playlists]);

  // Function to add a new playlist
  const addPlaylist = (playlist) => {
    const newPlaylist = {
      ...playlist,
      id: Date.now(),
      songs: []
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  // Function to delete a playlist
  const deletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
    if (currentPlaylist && currentPlaylist.id === playlistId) {
      setCurrentPlaylist(null);
      setCurrentSong(null);
    }
  };

  // Function to select a playlist to view/edit
  const selectPlaylist = (playlistId) => {
    const selected = playlists.find(playlist => playlist.id === playlistId);
    setCurrentPlaylist(selected);
  };

  // Function to add a song to the current playlist
  const addSong = (song) => {
    if (!currentPlaylist) return;
    
    const newSong = {
      ...song,
      id: Date.now()
    };
    
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === currentPlaylist.id) {
        return {
          ...playlist,
          songs: [...playlist.songs, newSong]
        };
      }
      return playlist;
    });
    
    setPlaylists(updatedPlaylists);
    setCurrentPlaylist({
      ...currentPlaylist,
      songs: [...currentPlaylist.songs, newSong]
    });
  };

  // Function to remove a song from a playlist
  const removeSong = (songId) => {
    if (!currentPlaylist) return;
    
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === currentPlaylist.id) {
        return {
          ...playlist,
          songs: playlist.songs.filter(song => song.id !== songId)
        };
      }
      return playlist;
    });
    
    setPlaylists(updatedPlaylists);
    setCurrentPlaylist({
      ...currentPlaylist,
      songs: currentPlaylist.songs.filter(song => song.id !== songId)
    });
    
    if (currentSong && currentSong.id === songId) {
      setCurrentSong(null);
    }
  };

  // Function to play a song
  const playSong = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <PlaylistForm addPlaylist={addPlaylist} />
          <PlaylistList 
            playlists={playlists} 
            deletePlaylist={deletePlaylist}
            selectPlaylist={selectPlaylist}
            currentPlaylistId={currentPlaylist?.id}
          />
        </div>
        <div className="content">
          {currentPlaylist ? (
            <div className="playlist-detail">
              <h2>{currentPlaylist.name}</h2>
              <div className="song-form">
                <h3>Add New Song</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const title = e.target.title.value;
                  const artist = e.target.artist.value;
                  const duration = e.target.duration.value;
                  if (title && artist) {
                    addSong({ title, artist, duration });
                    e.target.reset();
                  }
                }}>
                  <input 
                    type="text" 
                    name="title" 
                    placeholder="Song Title" 
                    required 
                  />
                  <input 
                    type="text" 
                    name="artist" 
                    placeholder="Artist" 
                    required 
                  />
                  <input 
                    type="text" 
                    name="duration" 
                    placeholder="Duration (e.g. 3:45)" 
                  />
                  <button type="submit">Add Song</button>
                </form>
              </div>
              <div className="songs-list">
                <h3>Songs</h3>
                {currentPlaylist.songs.length === 0 ? (
                  <p>No songs in this playlist yet.</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Duration</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPlaylist.songs.map(song => (
                        <tr key={song.id} className={currentSong?.id === song.id ? 'playing' : ''}>
                          <td>{song.title}</td>
                          <td>{song.artist}</td>
                          <td>{song.duration}</td>
                          <td>
                            <button onClick={() => playSong(song)}>Play</button>
                            <button onClick={() => removeSong(song.id)}>Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a playlist from the sidebar or create a new one.</p>
            </div>
          )}
        </div>
      </div>
      <MusicPlayer currentSong={currentSong} />
    </div>
  )
}

export default App