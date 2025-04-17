// src/components/PlaylistList/PlaylistList.jsx
import React from 'react';
import './PlaylistList.css';

const PlaylistList = ({ playlists, deletePlaylist, selectPlaylist, currentPlaylistId }) => {
  return (
    <div className="playlist-list">
      <h3>Your Playlists</h3>
      {playlists.length === 0 ? (
        <p>No playlists yet. Create one to get started!</p>
      ) : (
        <ul>
          {playlists.map(playlist => (
            <li 
              key={playlist.id} 
              className={currentPlaylistId === playlist.id ? 'selected' : ''}
            >
              <div className="playlist-info" onClick={() => selectPlaylist(playlist.id)}>
                <span className="playlist-name">{playlist.name}</span>
                <span className="song-count">{playlist.songs.length} songs</span>
              </div>
              <button 
                className="delete-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  deletePlaylist(playlist.id);
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlaylistList;