import React from 'react';
import './TeacherLessonSelector.css';

function TeacherLessonSelector({ selectedTab, setSelectedTab }) {
  return (
    <div className="teacher-lesson-selector-container">
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

export default TeacherLessonSelector;
