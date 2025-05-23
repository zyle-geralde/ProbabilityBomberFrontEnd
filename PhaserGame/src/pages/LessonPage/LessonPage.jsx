import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './LessonPage.css';
import './LessonSelector.css';

import ListOfLessons from '../../components/list-of-lessons/ListOfLessons';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import Leaderboard from '../../components/high-score-table/Leaderboard';
import ViewStudents from '../../components/viewstudents/ViewStudents';
import LevelCard from '../../components/quiz-card/LevelCard';
import { useGetAllQuiz } from '../../hooks/UseQuiz';

// import { useUserContext } from '../../contexts/UserContext';



function LessonPage({ userData }) {
  const location = useLocation();
  const { title, uid } = location.state || {};
  const [selectedTab, setSelectedTab] = useState('course');

  const classId = userData.classes[uid]

  const { data: quizzes, loading, error } = useGetAllQuiz();

  if (loading) return <div>Loading</div>
  if (error) return <p>Something went wrong: {error.message}</p>;

  const filteredList = quizzes.allQuizzes.filter(quiz => quiz.classIds[0] == classId)
  console.log(filteredList)


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
              {selectedTab === 'course' && <ListOfLessons
                userData={userData}
                title={title}
                classId={classId}
                uid={uid} />}
              {selectedTab === "created" && <div className="level-selector-container">
            {filteredList.map((level, index) => (
                <LevelCard
                    key={index}
                    title={level.quizName}
                    timeStarted={level.duration}
                    timeFinished={level.duration}
                    score={0}
                    avgScore={0}
                    avgTimeFinished={level.duration}
                    quizInfo={level}
                    classTitle={title}
                    uid={ uid}
                />
            ))
            }
        </div>}
              {selectedTab === 'students' && <ViewStudents
                userData={userData}
                className={title} />}
              
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
