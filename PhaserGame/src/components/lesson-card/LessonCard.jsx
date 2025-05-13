import React, { useState } from 'react';
import './LessonCard.css';
import QuizCard from '../quiz-card/QuizCard';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFile } from '@fortawesome/free-solid-svg-icons';

function LessonCard({ lesson }) {
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
                        <span className='topic-number'>Topic {lesson.id.split('lesson')[1]}</span>
                        <h2 className='topic-title'>{lesson.title}</h2>
                    </div>
                </div>
                <div className='lesson-container-right'>
                    {/* Add any other info like progress or additional icons here */}
                </div>
            </div>



            {isExpanded && (
                <>
                <div className='lesson-file-resource'>
                    <FontAwesomeIcon icon={faFile} className="lesson-file-icon"/>
                    <a href='#' className='lesson-file-link'>Lesson Resource File</a>
                </div>
                <div className='quiz-card-container'>
                    {lesson.quizzes.map((quiz) => (
                        <QuizCard
                            key={quiz.id} // Use the quiz id as the key for each quiz
                            levelsCompleted={quiz.levelsCompleted}
                            quizName={quiz.name}
                        />
                    ))}
                    {/* {isTeacher && (
                        
                    )} */}
                    <button className='add-quiz-btn'>Add Quiz</button>
                </div>
                </>
            )}
        </div>
    );
}

export default LessonCard;
