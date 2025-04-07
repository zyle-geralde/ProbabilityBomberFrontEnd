import React from 'react';
import HomeNavbar from '../components/navbar/HomeNavbar';
import LevelSelector from '../components/level-selector/LevelSelector';
import HighScoreTable from '../components/high-score-table/HighScoreTable';
import './HomePage.css';

function BeginnerStageMenu() {
    return (
      <>
        <HomeNavbar />
        <div className="main-container beginner-container">
          <LevelSelector />
          <HighScoreTable />
        </div>
      </>
    );
  }
  
export default BeginnerStageMenu;