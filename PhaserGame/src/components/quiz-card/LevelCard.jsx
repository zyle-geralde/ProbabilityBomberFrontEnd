import React from 'react';
import './LevelCard.css';
import * as AuthController from '../../controllers/AuthController';
import { useNavigate } from 'react-router-dom';

function LevelCard({
    title = 'Untitled Level',
    timeStarted = '-',
    timeFinished = '-',
    score = '-',
    avgScore = '-',
    avgTimeFinished = '-',
    quizInfo,
    classTitle,
    uid
}) {
    const { isTeacher } = AuthController.getCurrentUserRole();
    const navigate = useNavigate()
    console.log("Class TITLE: " + classTitle)
    console.log("Class TITLE: "+classTitle)

    return (
        <div className="level-container">
            <div className='level-container-left'>
                <div className="level-title-container">
                    <h4 className='level-title'>{title}</h4>
                </div>
                {!isTeacher ? (
                    <div className='level-stats-container-students'>
                        <p className='level-stat level-stat-time-started'>
                            Date & Time Started: <span className="bold-value">{timeStarted}</span>
                        </p>
                        <p className='level-stat level-stat-time-finished'>
                            Date & Time Finished: <span className="bold-value">{timeFinished}</span>
                        </p>
                    </div>
                ) : null}



            </div>

            <div className='level-container-right'>
                {isTeacher ? (
                    <div
                        className='level-stats-container'
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1rem',
                            alignItems: "center"
                        }}
                    >
                        <div className='level-stat-t'>
                            <div className='level-stat-value'>{avgScore}</div>
                            <p className='level-stat-label'>Avg Score</p>
                        </div>
                        <div className='level-stat-t'>
                            <div className='level-stat-value'>{avgTimeFinished}</div>
                            <p className='level-stat-label'>Avg Time Finished</p>
                        </div>
                        <a className="ms-2 text-primary" onClick={() => {
                            navigate("/viewQuiz", {
                                state: {
                                    quizName: title+"",
                                    createdBy:quizInfo.createdBy +"",
                                    difficulty: quizInfo.level == "1"? "beginner":quizInfo.level == "2"?"intermediate":"advanced",
                                    quizTime:quizInfo.duration + "",
                                    title: { title:classTitle } ,
                                    uid: { uid },
                                    topic:quizInfo.topic+""

                                }
                            })
                        }}>
                            <i className="fas fa-pen-to-square ms-2 cursor-pointer text-primary" style={{ cursor: "pointer" }}></i>
                        </a>
                    </div>
                ) : (
                    <>
                        <div className="level-score-container">
                            <div className="level-score">{score}</div>
                            <p className="level-score-label">Score</p>
                        </div>
                        <button className='level-start-btn'>Start</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default LevelCard;
