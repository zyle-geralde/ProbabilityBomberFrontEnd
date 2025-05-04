import React, { useState } from 'react';
import './LessonCard.css';
import QuizCard from '../quiz-card/QuizCard';
import QuizCardTeacher from '../quiz-card/QuizCardTeacher';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';

function LessonCard({ number = '1', title = 'Bayes Theorem' }) {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleQuizCard = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <div className="lesson-container">
            <div className='top-container seperator' onClick={toggleQuizCard}>
                <div className='lesson-container-left'>
                    <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
                    <div className="topic-title-container">
                        <span className='topic-number'>Topic {number}</span>
                        <h2 className='topic-title'>{title}</h2>
                    </div>
                </div>
                <div className='lesson-container-right'>
                    
                </div>
            </div>
            {isExpanded && (
                <div className='quiz-card-container'>
                    <QuizCard />
                </div>
            )}
            
        </div>
    );
}
  
export default LessonCard;