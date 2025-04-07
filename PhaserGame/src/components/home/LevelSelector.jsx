import React from 'react';
import './LevelSelector.css';

function LevelSelector() {
  const handleClick = (level) => {
    // You can add routing logic here if using React Router
    if (level === 'beginner') {
      window.location.href = "/homePage/beginnerStage";

    }
  };

  return (
    <div className="level-selector">
      <button onClick={() => handleClick('beginner')} className="level-btn">Beginner Stage</button>
      <button onClick={() => handleClick('intermediate')} className="level-btn disabled">Intermediate Stage</button>
      <button onClick={() => handleClick('advanced')} className="level-btn disabled">Advanced Stage</button>
      <button onClick={() => handleClick('expert')} className="level-btn disabled">Expert Stage</button>
      <button onClick={() => handleClick('master')} className="level-btn disabled">Master Stage</button>
    </div>
  );
}

export default LevelSelector;
