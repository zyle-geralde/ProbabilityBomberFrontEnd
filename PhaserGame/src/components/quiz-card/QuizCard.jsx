import React, { useState } from 'react';
import './QuizCard.css';
import LevelSelector from './LevelSelector';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function QuizCard({ levelsCompleted = '-'}) {
    const [showLevels, setShowLevels] = useState(false);

    const toggleLevels = () => {
        setShowLevels(prev => !prev);
    };

    return (
        <div className="quiz-container">
            <div className='top-container'>
                <div className='quiz-container-left'>
                    {/* <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" /> */}
                    <div className="quiz-completion-container">
                        <h2 className='quiz-completed-count'>{levelsCompleted}</h2>
                        <p className='quiz-completed-label'>Levels Completed</p>
                    </div>
                </div>
                <div className='quiz-container-right'>
                    {/* <div className="average-score-container">
                        <div className="score-circle">{average}</div>
                        <p className="average-label">Avg Score</p>
                    </div> */}
                    <button className='show-levels-btn' onClick={toggleLevels}>
                        {showLevels ? 'Hide Levels' : 'Show Levels'}
                    </button>
                </div>
            </div>
            
            {showLevels && (
                <div className='bottom-container'>
                    <LevelSelector />
                </div>
            )}
        </div>
    );
}

export default QuizCard;