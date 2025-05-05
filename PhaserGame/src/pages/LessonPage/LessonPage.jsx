import React, { useState } from 'react';
import './LessonPage.css';

import ListOfLessons from '../../components/list-of-lessons/ListOfLessons';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import TeacherLessonSelector from '../../components/teacher-lesson-selector/TeacherLessonSelector';
import Leaderboard from '../../components/high-score-table/Leaderboard';
import { useUserContext } from '../../contexts/UserContext';

function LessonPage() {
  const [selectedTab, setSelectedTab] = useState('course');

  return (
    <>
      <HomeNavbar />
      <div className='teacher-lesson-page-container'>
        <div className="selector-area">
          <TeacherLessonSelector 
            selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab} 
          />
        </div>

        <div className="main-content">
          <div className='lesson-card-area'>
            {selectedTab === 'course' && (
              <ListOfLessons /> 
            )}
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
