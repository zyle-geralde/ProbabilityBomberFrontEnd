import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import './LessonPage.css';
import './LessonSelector.css';

import ListOfLessons from '../../components/list-of-lessons/ListOfLessons';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import Leaderboard from '../../components/high-score-table/Leaderboard';
import ViewStudents from '../../components/viewstudents/ViewStudents';
import LevelCard from '../../components/quiz-card/LevelCard';
import { useGetAllQuiz } from '../../hooks/UseQuiz';
import * as AuthController from '../../controllers/AuthController';
import { useTeacherClasses } from '../../hooks/UseTeacher';
import { useGetAllStudentInformation } from '../../hooks/UseQuiz';


// import { useUserContext } from '../../contexts/UserContext';



function LessonPage({ userData }) {
  const role = AuthController.getCurrentUserRole();
  const isTeacher = role === 'teacher';
  const location = useLocation();
  const { title, uid } = location.state || {};
  const [selectedTab, setSelectedTab] = useState('course');
  const navigate = useNavigate();
  const [studentLeaderBoards,setstudentLeaderBoards] = useState([])

  useEffect(() =>{
    console.log(studentLeaderBoards)
  },[studentLeaderBoards])
  
  const classId = isTeacher
  ? userData.classes[uid]
    : userData.classId || null;
  
  
  /*const studentName = !isTeacher ? userData.name : "none"
  const studentData = studentLeaderBoards.filter(info => info.name == studentName)
  console.log("STUDENTDATA: " + JSON.stringify(studentData))*/

  const { data: quizzes, loading, error } = useGetAllQuiz();
  //console.log(allClass)

  if (loading) return <div>Loading</div>
  if (error) return <p>Something went wrong: {error.message}</p>;

  const filteredList = quizzes.allQuizzes.filter(quiz => quiz.classIds[0] == classId)
  console.log(filteredList)

  console.log("LocalStore: " + localStorage.getItem("userData"))


  return (
    <div>
      <HomeNavbar />
      {isTeacher && <button
            className='btn btn-danger'style={{"marginLeft":"40px","marginTop":"30px"}}
                onClick={() => navigate('/classPage')}
            >
            {"<"}
        </button>}


      {!classId && !isTeacher? (
        <div className="no-class-message">
          <h2>No Classes Assigned yet</h2>
        </div>
      ) : (
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

              {isTeacher && (
                <>
                  <button className={`lesson-button ${selectedTab === 'students' ? 'active' : ''}`} onClick={() => setSelectedTab('students')}>
                    View Students
                  </button>
                  <button className={`lesson-button ${selectedTab === 'students' ? 'active' : ''}`} onClick={() => navigate('/classPerformancePage', {state: { classId }})}>
                    Class Performance
                    </button>
                </>
              )}

            </div>
          </div>

          {/* Main Lesson Content */}
          <div className="main-content">
            <div className="lesson-card-area">
              <div className="lesson-card-area-title">
                Discrete Structures 2: Probabilities
              </div>

              <div className="list-of-lessons">
                {selectedTab === 'course' && (
                  <ListOfLessons
                    userData={userData}
                    title={title}
                    classId={classId}
                    uid={uid}
                    setstudentLeaderBoards={setstudentLeaderBoards}
                  />
                )}
                {selectedTab === 'created' && (
                  <div className="level-selector-container">
                      {filteredList.map((level, index) => (
                        <LevelCard
                          key={index}
                          title={level.quizName}
                          duration={level.duration}
                          score={0}
                          avgScore={0}
                          avgTimeFinished={level.duration}
                          quizInfo={level}
                          classTitle={title}
                          uid={uid}
                          userData={userData}
                          setstudentLeaderBoards={setstudentLeaderBoards}
                      />
                    ))}
                  </div>
                )}
                {selectedTab === 'students' && (
                  <ViewStudents userData={userData} className={title} />
                )}
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
                studentLeaderBoards={studentLeaderBoards}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonPage;
