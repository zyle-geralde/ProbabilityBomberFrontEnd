import React from 'react';
import HomeNavbar from '../components/navbar/HomeNavbar';
import CharacterOverview from '../components/home/CharacterOverview';
import LevelSelector from '../components/home/LevelSelector';
import './HomePage.css';
function HomePage() {
  return (
    <>
    <HomeNavbar />
    <div className="main-container">
      <CharacterOverview />
      <LevelSelector />
    </div>
    </>
  );
}

export default HomePage;