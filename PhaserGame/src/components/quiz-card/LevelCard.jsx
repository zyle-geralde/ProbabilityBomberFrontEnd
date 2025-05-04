import React from 'react';
import './LevelCard.css';

function LevelCard({ title = 'Untitled Level', timeStarted = '-', timeFinished = '-', score = '-' }) {
    return (
        <div className="level-container">
            <div className='level-container-left'>
                <div className="level-title-container">
                    <h2 className='level-title'>{title}</h2>
                </div>
                <div className='level-stats-container'>
                    <p className='level-stat level-stat-time-started'>
                        Date & Time Started {timeStarted}
                    </p>
                    <p className='level-stat level-stat-time-finished'>
                        Date & Time Finished {timeFinished}
                    </p>
                </div>
            </div>
            <div className='level-container-right'>
                <div className="level-score-container">
                    <div className="level-score">{score}</div>
                    <p className="level-score-label">Score</p>
                </div>
                <button className='level-start-btn'>
                    Start
                </button>
            </div>
        </div>
    );
}

export default LevelCard;