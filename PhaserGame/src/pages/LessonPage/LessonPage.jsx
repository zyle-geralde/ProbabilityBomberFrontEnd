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
import LessonCard from "../../components/lesson-card/LessonCard";
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
      <div className="lesson-page-wrapper">

          <div className="header-container relative min-h-[300px] text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-rose-300 to-[#641B2E] opacity-80"></div>

            <img
                src="/images/authentication_background.png"
                alt="Stage Background"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                onError={(e) => (e.currentTarget.style.display = "none")}
            />

            <div class="welcome-Header relative z-20 max-w-7xl mx-auto px-4 lg:px-8 py-16">
              {/* Breadcrumb */}
              <ol className="flex items-center space-x-2 text-sm mb-4">
                <li>
                    Homepage /
                </li>
              </ol>

              {/* Header */}
              <div className="text-center">
                <h1 className="!text-6xl text-center font-bold mb-2">Welcome to the Quiz Catalog</h1>
                <p className="!mt-10 flex-col md:flex-row items-center justify-center gap-6 text-gray-200 text-lg">
                    Challenge yourself with our curated quiz collection.
                </p>
              </div>
            </div>
          </div>
          

          {/* Content */}
          <div className="lesson-page-container">
            <div className="lesson-panel flex flex-wrap gap-6 p-6 items-start justify-center w-full bg-gray-100 box-border">

                <LessonCard
                  stage="/tutorialPage"
                  image="lesson-image.jpg"
                  title="Tutorial"
                  description="Learn the basics of the game here. This tutorial will walk you through movement, interactions, and scoring so you’re ready for the main stages."
                />

                <LessonCard
                  stage="/stagePage"
                  image="lesson-image.jpg"
                  title="Chance 101"
                  description="Introduction to Probability — discover how randomness and chance shape the world around us."
                />

                <LessonCard
                  stage="/stage01Page"
                  image="lesson-image.jpg"
                  title="When Events Happen"
                  description="Equally Likely & Complementary Events — learn when outcomes share the same probability and how complements balance the odds."
                />

                <LessonCard
                  stage="/stage02Page"
                  image="lesson-image.jpg"
                  title="Probability in Action"
                  description="Types of Probability — explore classical, experimental, and subjective approaches to calculating chance."
                />

                <LessonCard
                  stage="/stage03Page"
                  image="lesson-image.jpg"
                  title="When Events Collide"
                  description="Mutually and Not Mutually Exclusive Events — see what happens when events overlap (or don’t)."
                />

                <LessonCard
                  image="lesson-image.jpg"
                  title="Predicting the Unpredictable"
                  description="Random Variables — uncover how probabilities are tied to numbers, from coin flips to real-world data."
                />
            </div>
          </div>
        </div>
    </div>
  );
}

export default LessonPage;
