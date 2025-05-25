import React from 'react';
import './LevelCard.css';
import * as AuthController from '../../controllers/AuthController';
import { useNavigate } from 'react-router-dom';
import { getAllQuestion } from '../../controllers/QuestionController';
import { useGetAllStudentInformation } from '../../hooks/UseQuiz';
import { useGetStudentClass } from '../../hooks/UseStudent';
import { useState } from 'react';
import { useEffect } from 'react';

function LevelCard({
    title = 'Untitled Level',
    duration = '-',
    // timeFinished = '-',
    score = '-',
    avgScore = '-',
    avgTimeFinished = '-',
    quizInfo,
    classTitle,
    uid,
    setstudentLeaderBoards
}) {
    const isTeacher = AuthController.getCurrentUserRole();
    const [studentData, setStudentData] = useState([]);
    let datam =null
    if (!isTeacher) {
        const { data, loadingm, error } = useGetStudentClass();
        datam= data
    }
    else {
        datam = classTitle
    }
    

    const handleClickStudentInfo = async () => {
        console.log("QUIZINFO :" + quizInfo.quizName)
        console.log(classTitle)
        const { success, response, error } = await useGetAllStudentInformation(quizInfo.quizName);
        if (success) {
            
            const notArranged = response.data.allQuizInformation[!isTeacher?datam.className:datam];

            if (notArranged.length > 0) {
                const flattened = notArranged.map(entry => {
                    const name = Object.keys(entry)[0];
                    const info = entry[name];
                    return { name, ...info };
                });

                // Step 2: Sort
                const ranked = flattened.sort((a, b) => {
                    if (a.score !== b.score) return b.score - a.score; // Higher score first
                    if (a.noAttempts !== b.noAttempts) return a.noAttempts - b.noAttempts; // Fewer attempts
                    return a.timeCompletion - b.timeCompletion; // Lower time first
                });

                setstudentLeaderBoards(ranked)
            }
            // make sure response.data has what you need
        } else {
            console.error("Error on studentInfo")
        }
    };


    const navigate = useNavigate()
    console.log("Class TITLE: " + classTitle)
    console.log("Class TITLE: " + classTitle)
    console.log(duration)

    let navigateToGame = (e) => {
        navigate("/PhaserGame", {
            state: {
                quizInfo: quizInfo,
                classTitle: classTitle
            }
        })
    }
    return (
        <>
            {!isTeacher && <div className="level-container">
                <div className='level-container-left' onClick={handleClickStudentInfo}>
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
                                <button className='btn btn-danger' onClick={navigateToGame}>Start</button>
                            </div>
                        </>
                    )}
                </div>
            </div>}


            {isTeacher && <div className="level-container">
                <div className='level-container-left' onClick={handleClickStudentInfo}>
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
            </div>}
        </>


    );
}

export default LevelCard;
