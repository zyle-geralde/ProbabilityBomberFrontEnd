import React, { useState } from 'react';
import './HomeNavbar.css'; // Import the CSS file

function HomeNavbar({ username = "Guest" }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            [LOGO]
          </div>
          
          <div className="navbar-user">
            <div className="welcome-text">Welcome, {username}</div>
            <button 
              className="settings-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              ⚙️
            </button>
            
            {showDropdown && (
              <div className="dropdown-menu" style={{ display: 'block' }}>
                <button className="dropdown-item">Profile</button>
                <button className="dropdown-item">Settings</button>
                <button className="dropdown-item">Logout</button>
              </div>
            )}

          </div>
        </div>
      </nav>
      
      {/* Spacer to push content below fixed navbar
      <div className="navbar-spacer"></div> */}
    </>
  );
}

export default HomeNavbar;