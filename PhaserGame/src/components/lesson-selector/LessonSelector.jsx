import React from 'react';
import './LessonSelector.css';

function LessonSelector({ selectedTab, setSelectedTab }) {
  return (
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
    </div>
  );
}

export default LessonSelector;
