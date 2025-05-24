import React from 'react';
import './LevelCard.css';
import * as AuthController from '../../controllers/AuthController';
import { useNavigate } from 'react-router-dom';

function LevelCard({
    title = 'Untitled Level',
    duration = '-',
    // timeFinished = '-',
    score = '-',
    avgScore = '-',
    avgTimeFinished = '-',
    quizInfo,
    classTitle,
    uid
}) {
    const isTeacher = AuthController.getCurrentUserRole();
    const navigate = useNavigate()
    console.log("Class TITLE: " + classTitle)
    console.log("Class TITLE: " + classTitle)
    console.log(duration)
    return (
        <div className="level-container">
            <div className='level-container-left'>
                <div className="level-title-container">
                    <h6 className='level-title'>{title}</h6>
                </div>


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
                            <div className='level-stat-value'>{quizInfo.questions.length}</div>
                            <p className='level-stat-label'>Total Score</p>
                        </div>
                        <div className='level-stat-t'>
                            <div className='level-stat-value'>{quizInfo.duration} min</div>
                            <p className='level-stat-label'>Duration</p>
                        </div>
                        <a className="ms-2 text-primary" onClick={() => {
                            navigate("/viewQuiz", {
                                state: {
                                    quizName: title + "",
                                    createdBy: quizInfo.createdBy + "",
                                    difficulty: quizInfo.level == "1" ? "beginner" : quizInfo.level == "2" ? "intermediate" : "advanced",
                                    quizTime: quizInfo.duration + "",
                                    title: { title: classTitle },
                                    uid: { uid },
                                    topic: quizInfo.topic + ""

                                }
                            })
                        }}>
                            <i className="fas fa-pen-to-square ms-2 cursor-pointer text-primary" style={{ cursor: "pointer" }}></i>
                        </a>
                    </div>
                ) : (
                    <>
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
                            <div className='level-stat-value'>{quizInfo.questions.length}</div>
                            <p className='level-stat-label'>Total Score</p>
                        </div>
                        <div className='level-stat-t'>
                            <div className='level-stat-value'>{0}</div>
                            <p className='level-stat-label'>Score</p>
                        </div>
                        <div className='level-stat-t'>
                            <div className='level-stat-value'>{quizInfo.duration} min</div>
                            <p className='level-stat-label'>Duration</p>
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default LevelCard;
