import React, { useState } from 'react';
import './LessonCard.css';
import { useUserContext } from '../../contexts/UserContext';
import QuizCard from '../quiz-card/QuizCard';
import { useNavigate } from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFile } from '@fortawesome/free-solid-svg-icons';

function LessonCard({ lesson }) {
    const navigate = useNavigate();
    const { isTeacher } = useUserContext();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [newQuizTitle, setNewQuizTitle] = useState('');

    const [difficulty, setDifficulty] = useState("");
    const [quizTime, setQuizTime] = useState("");

    const toggleQuizCard = () => setIsExpanded(prev => !prev);

    const handleAddQuizClick = () => setShowForm(true);

    const handleCancel = () => {
        setShowForm(false);
        setNewQuizTitle('');
    };

    const handleSave = () => {
        setShowForm(false);
        console.log('New Quiz Title:', newQuizTitle);
        navigate("/addQuiz")

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
                        <FontAwesomeIcon icon={faFile} className="lesson-file-icon" />
                        <a href='#' className='lesson-file-link'>Lesson Resource File</a>
                    </div>
                    <div className='quiz-card-container'>
                        {lesson.quizzes.map((quiz) => (
                            <QuizCard
                                key={quiz.id} // Use the quiz id as the key for each quiz
                                levelsCompleted={quiz.levelsCompleted}
                                quizName={quiz.name}
                                lessons={lesson}
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
                <div className="overlay d-flex justify-content-center align-items-center">
                    <div className="overlay-form bg-white p-4 rounded shadow" style={{ width: '400px', position: 'relative' }}>
                        <button
                            className="btn-close position-absolute top-0 end-0 m-3"
                            onClick={handleCancel}
                            aria-label="Close"
                        ></button>

                        <h3 className="mb-4">Add New Quiz</h3>

                        {/* Quiz Title */}
                        <div className="mb-3">
                            <label htmlFor="quizTitle" className="form-label">Quiz Title</label>
                            <input
                                type="text"
                                id="quizTitle"
                                className="form-control"
                                placeholder="Enter quiz title"
                                value={newQuizTitle}
                                onChange={(e) => setNewQuizTitle(e.target.value)}
                            />
                        </div>

                        {/* Difficulty Dropdown */}
                        <div className="mb-3">
                            <label htmlFor="quizDifficulty" className="form-label">Difficulty</label>
                            <select
                                id="quizDifficulty"
                                className="form-select"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                <option value="">Select difficulty</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>

                        {/* Time Input */}
                        <div className="mb-4">
                            <label htmlFor="quizTime" className="form-label">Time (minutes)</label>
                            <input
                                type="number"
                                id="quizTime"
                                className="form-control"
                                min="1"
                                value={quizTime}
                                onChange={(e) => setQuizTime(e.target.value)}
                                placeholder="Enter time in minutes"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default LessonCard;
