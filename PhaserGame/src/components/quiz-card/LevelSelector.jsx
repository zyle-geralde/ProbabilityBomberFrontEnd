import React from 'react';
import './LevelSelector.css';
import LevelCard from './LevelCard';

function LevelSelector({ lessons, quizStage,title,uid }) {
    let newQuizStage = quizStage == "Beginner"? 1: quizStage =="Intermediate"?2:3
    const filteredList = lessons.filter(quiz => quiz.level + "" == newQuizStage + "")
    console.log("New List")
    console.log(filteredList)
    console.log(lessons)
    console.log(quizStage)

    return (
        <div className="level-selector-container">
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
        </div>
    );
}

export default LevelSelector;
