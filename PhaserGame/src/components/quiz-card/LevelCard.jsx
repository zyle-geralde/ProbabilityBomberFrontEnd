import React from 'react';
import './LevelCard.css';
import * as AuthController from '../../controllers/AuthController';

function LevelCard({
    title = 'Untitled Level',
    timeStarted = '-',
    timeFinished = '-',
    score = '-',
    avgScore = '-',
    avgTimeFinished = '-'
}) {
    const { isTeacher } = AuthController.getCurrentUserRole();

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
                            alignItems:"center"
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
                        <a href="/viewQuiz" className="ms-2 text-primary">
                            <i className="fas fa-pen-to-square ms-2 cursor-pointer text-primary" style={{cursor:"pointer"}}></i>
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
