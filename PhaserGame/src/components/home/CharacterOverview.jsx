import React from 'react';
import './CharacterOverview.css';
import reiPortrait from "/images/game-character-template.png"; // Make sure this path is correct

function CharacterOverview() {
  return (
    <div className="character-overview">
      <div className="char-info">
        <div className="char-details">
          <h2 className="char-title">PROBABILITY BOMBERMAN!</h2>
          <p className="char-line"><strong>Name:</strong> Theodore</p>
          <p className="char-line"><strong>Level:</strong> Beginner</p>
        </div>
        <div className="char-image-container">
          <img src={reiPortrait} alt="Character" className="char-image" />
          <p className="char-type"><strong>Type:</strong> WildCat</p>
        </div>
      </div>
      
    </div>
  );
}

export default CharacterOverview;
