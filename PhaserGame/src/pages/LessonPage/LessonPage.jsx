import React, { useState } from 'react';

import './LessonPage.css';
import './LessonSelector.css';

import ListOfLessons from '../../components/list-of-lessons/ListOfLessons';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import Leaderboard from '../../components/high-score-table/Leaderboard';
import ViewStudents from '../../components/viewstudents/ViewStudents';



function LessonPage() {
  const [selectedTab, setSelectedTab] = useState('course');

  return (
    <div>
      <HomeNavbar />

      <div className="teacher-lesson-page-container">
        {/* Sidebar Selector */}
        <div className="selector-area">
          <div className="lesson-selector-container">
            <div className="title">Activities</div>
            <button
              className={`lesson-button ${selectedTab === 'course' ? 'active' : ''}`}
              onClick={() => setSelectedTab('course')}
            >
              Course
            </button>
            <button
              className={`lesson-button ${selectedTab === 'created' ? 'active' : ''}`}
              onClick={() => setSelectedTab('created')}
            >
              Created by Teacher
            </button>

            <button
              className={`lesson-button ${selectedTab === 'students' ? 'active' : ''}`}
              onClick={() => setSelectedTab('students')}
            >
              View Students
            </button>
          </div>
        </div>

        {/* Main Lesson Content */}
        <div className="main-content">
          <div className="lesson-card-area">
            <div className="lesson-card-area-title">
              Discrete Structures 2: Probabilities
            </div>

            <div className="list-of-lessons">
              {selectedTab === 'course' && <ListOfLessons />}
              {selectedTab === 'students' && <ViewStudents/>}
              
              {/* You can add `selectedTab === 'created' && <CreatedLessons />` here if needed */}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="leaderboard-container">
          <Leaderboard 
            title="Leaderboard" 
            showTime={true} 
            showRank={true} 
            showScore={true} 
          />
        </div>
      </div>
    </div>
  );
}

export default LessonPage;
