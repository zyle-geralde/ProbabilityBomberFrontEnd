import React from 'react';
// import './LessonCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function QuizCard({ title = 'Untitled Quiz', average = '-'}) {
    return (
        <div className="quiz-container">
            <div className='qt-top-container'>
                <div className='lesson-container-left'>
                    <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
                    <div className="quiz-title-container">
                        <h2 className='quiz-title'>{title}</h2>
                    </div>
                </div>
                <div className='quiz-container-right'>
                    <div className="average-score-container">
                        <div className="score-circle">{average}</div>
                        <p className="average-label">Avg Score</p>
                    </div>
                    <button className='teacher-edit-btn'>Edit Button</button>
                </div>
            </div>
            <div className='qt-bottom-container'>

            </div>
        </div>
    );
}

export default QuizCard;