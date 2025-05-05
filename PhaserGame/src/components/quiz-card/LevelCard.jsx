import React from 'react';
import './LevelCard.css';
import { useUserContext } from '../../contexts/UserContext';

function LevelCard({
    title = 'Untitled Level',
    timeStarted = '-',
    timeFinished = '-',
    score = '-',
    avgScore = '-',
    avgTimeFinished = '-'
}) {
    const { userId } = useUserContext();
    const isTeacher = userId === 'u123456'; // Temporary teacher check

    return (
        <div className="level-container">
            <div className='level-container-left'>
                <div className="level-title-container">
                    <h4 className='level-title'>{title}</h4>
                </div>
                <div className='level-stats-container-students'>
                    {!isTeacher ? (
                        <>
                            <p className='level-stat level-stat-time-started'>
                                Date & Time Started: <span className="bold-value">{timeStarted}</span>
                            </p>
                            <p className='level-stat level-stat-time-finished'>
                                Date & Time Finished: <span className="bold-value">{timeFinished}</span>
                            </p>
                        </>
                    ) : null}
                </div>
            </div>

            <div className='level-container-right'>
                {isTeacher ? (
                    <div 
                        className='level-stats-container' 
                        style={{ 
                            display: 'flex', 
                            flexDirection: 'row', 
                            gap: '1rem' 
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
                        <button className='level-edit-btn'>Edit</button>
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
