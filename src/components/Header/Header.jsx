// src/components/Header/Header.jsx
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Music Playlist Manager</h1>
      </div>
      <div className="header-right">
        <p>Your personal music organizer</p>
      </div>
    </header>
  );
};

export default Header;