// src/components/PlaylistForm/PlaylistForm.jsx
import React, { useState } from 'react';
import './PlaylistForm.css';

const PlaylistForm = ({ addPlaylist }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addPlaylist({ name });
      setName('');
    }
  };

  return (
    <div className="playlist-form">
      <h3>Create New Playlist</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Playlist Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default PlaylistForm;