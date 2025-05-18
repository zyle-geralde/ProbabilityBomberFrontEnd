import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeNavbar.css';
import * as AuthController from '../../controllers/AuthController';

function HomeNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); 

  const username = AuthController.getUsername();
  console.log("username: ", username);

  const handleLogout = () => {
    AuthController.logoutUser({ navigate }); 
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <a href="/lessonPage">
              <img src="./images/bomb-logo.svg" alt="Logo" />
            </a>
           
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
              <div className="dropdown-menu">
                <button className="dropdown-item">Profile</button>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default HomeNavbar;
