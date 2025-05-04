import React from 'react';
import './TeacherLessonPage.css';

import HomeNavbar from '../../components/navbar/HomeNavbar';
import TeacherLessonSelector from '../../components/teacher-lesson-selector/TeacherLessonSelector';
import LessonCard from '../../components/lesson-card/LessonCard';

function TeacherLessonPage() {
    return (
      <>
        <HomeNavbar/>
        <div className='teacher-lesson-page-container'>
            <div className="selector-area">
                <TeacherLessonSelector />
            </div>
            <div className='lesson-card-area'>
                <LessonCard number='1' title='Bayes Theorem'/>
                <LessonCard number='2' title='Probability Basics' />
            </div>
        </div>


      </>
    );
  }
  
export default TeacherLessonPage;