// src/components/MusicPlayer/MusicPlayer.jsx
import React from 'react';
import './MusicPlayer.css';

const MusicPlayer = ({ currentSong }) => {
  return (
    <div className={`music-player ${currentSong ? 'active' : ''}`}>
      {currentSong ? (
        <div className="player-content">
          <div className="song-info">
            <div className="now-playing">Now Playing:</div>
            <div className="song-title">{currentSong.title}</div>
            <div className="song-artist">{currentSong.artist}</div>
          </div>
          <div className="player-controls">
            <button className="control-btn">⏮️</button>
            <button className="control-btn play-btn">▶️</button>
            <button className="control-btn">⏭️</button>
          </div>
          <div className="player-timeline">
            <div className="time">0:00</div>
            <div className="progress-bar">
              <div className="progress" style={{ width: '0%' }}></div>
            </div>
            <div className="duration">{currentSong.duration || '0:00'}</div>
          </div>
        </div>
      ) : (
        <div className="no-song">
          <p>No song selected. Choose a song from a playlist to play.</p>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;