import React from 'react';
import './LevelSelector.css';
import LevelCard from './LevelCard';

function LevelSelector({ lessons, quizStage,title,uid,userData,setstudentLeaderBoards }) {
    let newQuizStage = quizStage == "Beginner"? 1: quizStage =="Intermediate"?2:3
    const filteredList = lessons.filter(quiz => quiz.level + "" == newQuizStage + "")
    // console.log("New List")
    // console.log(filteredList)
    // console.log(lessons)
    // console.log(quizStage)

    return (
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
            ))
            }
        </div>
    );
}

export default LevelSelector;
