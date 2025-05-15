import React, { useState } from 'react';
import './LessonCard.css';
import { useUserContext } from '../../contexts/UserContext';
import QuizCard from '../quiz-card/QuizCard';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFile } from '@fortawesome/free-solid-svg-icons';

function LessonCard({ lesson }) {
    const { isTeacher } = useUserContext(); 
    const [isExpanded, setIsExpanded] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [newQuizTitle, setNewQuizTitle] = useState('');

    const toggleQuizCard = () => setIsExpanded(prev => !prev);

    const handleAddQuizClick = () => setShowForm(true);

    const handleCancel = () => {
        setShowForm(false);
        setNewQuizTitle('');
    };

    const handleSave = () => {
        setShowForm(false);
        console.log('New Quiz Title:', newQuizTitle);
    }

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


            {/*Expands a quiz card when clicked*/}
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
                    {isTeacher && (
                        <button className='add-quiz-btn' onClick={handleAddQuizClick}>Add Quiz</button>
                    )}
                </div>
                </>
            )}
            
            {/*Show the form to add a new quiz*/}
            {showForm && (
                <div className="overlay">
                    <div className="overlay-form">
                        <button className="close-btn" onClick={handleCancel}>&times;</button>
                        <h3>Add New Quiz</h3>
                        <input
                            type="text"
                            placeholder="Enter quiz title"
                            value={newQuizTitle}
                            onChange={(e) => setNewQuizTitle(e.target.value)}
                        />
                        <div className="form-buttons">
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LessonCard;
