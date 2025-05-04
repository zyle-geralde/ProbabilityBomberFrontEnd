import React from 'react';
import './TeacherLessonSelector.css';

function TeacherLessonSelector() {
    return (
      <>
        <div className="teacher-lesson-selector-container">
            <button className="lesson-button">Created Lessons</button>
            <button className="lesson-button">Teacher Created Lessons</button>
        </div>
      </>
    );
  }
  
export default TeacherLessonSelector;