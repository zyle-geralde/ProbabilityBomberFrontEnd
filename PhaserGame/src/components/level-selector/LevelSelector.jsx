import React from 'react';
import './LevelSelector.css'; 

function BeginnerLevelSelector() {
  return (
    <div className="level-selector">
      {[...Array(10)].map((_, i) => (
        <button key={i} className="level-btn">
          Level {i + 1}
        </button>
      ))}
    </div>
  );
}

export default BeginnerLevelSelector;
