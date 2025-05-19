import React, { useState } from 'react';

import './QuizCard.css';

import LevelSelector from './LevelSelector';
import * as AuthController from '../../controllers/AuthController';

function QuizCard({ levelsCompleted = '-', quizName = 'Untitled Quiz',lessons }) {
    const { isTeacher } = AuthController.getCurrentUserRole(); 
    const [showLevels, setShowLevels] = useState(false);

    const toggleLevels = () => {
        setShowLevels(prev => !prev);
    };

    return (
        <div className="quiz-container">
            <div className='top-container'>
                <div className='quiz-container-left'>
                    <h3 className='quiz-name'>{quizName}</h3>

                    {/* Conditionally render Levels Completed if not teacher */}
                    {!isTeacher && (
                        <div className="quiz-completion-container">
                            <h2 className='quiz-completed-count'>{levelsCompleted}</h2>
                            <p className='quiz-completed-label'>Levels Completed</p>
                        </div>
                    )}
                    
                </div>
                <div className='quiz-container-right'>
                    <button className='show-levels-btn' onClick={toggleLevels}>
                        {showLevels ? 'Hide Quizzes' : 'Show Quizzes'}
                    </button>
                    {/*isTeacher && (
                        <button className='edit-quiz-btn'>
                            Edit
                        </button>
                    )*/}

                </div>
            </div>
            
            {showLevels && (
                <div className='bottom-container'>
                    <LevelSelector
                        lessons={lessons}
                    />
                </div>
            )}
        </div>
    );
}

export default QuizCard;
