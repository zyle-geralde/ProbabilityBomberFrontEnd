import React, { useState } from 'react';
import './LessonPage.css';

import ListOfLessons from '../../components/list-of-lessons/ListOfLessons';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import LessonSelector from '../../components/lesson-selector/LessonSelector';
import Leaderboard from '../../components/high-score-table/Leaderboard';
import { useUserContext } from '../../contexts/UserContext';

function LessonPage() {
  const [selectedTab, setSelectedTab] = useState('course');

  return (
    <>
      <HomeNavbar />
      <div className='teacher-lesson-page-container'>
        <div className="selector-area">
          <LessonSelector 
            selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab} 
          />
        </div>

        <div className="main-content">
          <div className='lesson-card-area'>
            <div className='lesson-card-area-title'>Discrete Structures 2: Probabilities</div>
            <div className='list-of-lessons'>
              {selectedTab === 'course' && (
                <ListOfLessons /> 
              )}
            </div>

          </div>
        </div>

        <div className='leaderboard-container'>
          <Leaderboard 
            title="Leaderboard" 
            showTime={true} 
            showRank={true} 
            showScore={true}/>
        </div>
      </div>
    </>
  );
}

export default LessonPage;
