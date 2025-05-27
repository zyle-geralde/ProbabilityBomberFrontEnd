import React, { useState } from 'react';
import './LessonCard.css';

import * as AuthController from '../../controllers/AuthController';
import QuizCard from '../quiz-card/QuizCard';
import { useNavigate } from 'react-router-dom';
import * as UseQuiz from "../../hooks/UseQuiz"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFile } from '@fortawesome/free-solid-svg-icons';

function LessonCard({ lesson,quizList,title,userData,uid, resourceLink, setstudentLeaderBoards  }) {
    const role = AuthController.getCurrentUserRole();
    const isTeacher = role === 'teacher';
    const [isExpanded, setIsExpanded] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [newQuizTitle, setNewQuizTitle] = useState('');
    const [difficulty, setDifficulty] = useState("");
    const [quizTime, setQuizTime] = useState("");
    const [error, setError] = useState(""); // ✅ Error state added
    const levels = [1, 2, 3]


    const navigate = useNavigate();
    const topic = lesson.id.split('lesson')[1];

    const toggleQuizCard = () => setIsExpanded(prev => !prev);

    const handleAddQuizClick = () => setShowForm(true);

    const handleCancel = () => {
        setShowForm(false);
        setNewQuizTitle('');
        setDifficulty('');
        setQuizTime('');
        setError(""); // ✅ Clear error on cancel
    };

const handleSave = async () => {
    if (newQuizTitle.trim() === "" || difficulty.trim() === "" || quizTime.toString().trim() === "") {
        console.log(difficulty)
        setError("All fields are required.");
        return;
    }

    setError(""); // Clear any previous error

    const topic = lesson.id.split('lesson')[1];

    try {
        const { success, response, error: createError } = await UseQuiz.createQuiz(
            newQuizTitle,
            topic,
            difficulty == "beginner"?1:difficulty == "intermediate"?2:3,
            parseInt(quizTime+"")
        );

        if (success) {

            const { success, response, error: createError } = await UseQuiz.addClassToQuiz(
                newQuizTitle,
                title,
            );
            if (success) {
                setShowForm(false);
                console.log('Quiz Created:', response);
                navigate("/addQuiz", {
                state: {
                    quizName: newQuizTitle,
                    createdBy: userData.name,
                    difficulty: difficulty,
                        quizTime: quizTime,
                        title: { title },
                    uid:{uid}
                    
                }
            }); 
            }
            else {
                setError("Failed to create quiz. Class error");
            }
        } else {
            setError("Failed to create quiz. Please try again.");
        }
    } catch (err) {
        setError("Something went wrong while creating the quiz.");
    }
};

// console.log("Resource Link: ", resourceLink)
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
                    {/* Additional info here if needed */}
                </div>
            </div>

            {isExpanded && (
                <>
                    <div className='lesson-file-resource'>
                        <FontAwesomeIcon icon={faFile} className="lesson-file-icon" />
                        <a href={resourceLink} className='lesson-file-link'>Lesson Resource File</a>
                    </div>
                    <div className='quiz-card-container'>
                        {levels.map((quiz,index) => (
                            <QuizCard
                                key={quiz.index}
                                levelsCompleted={0}
                                quizName={quiz + "" == "1" ? "Beginner" : quiz + "" == "2" ? "Intermediate" : "Advance"}
                                lessons={quizList}
                                title={ title }
                                uid={uid}
                                userData={userData}
                                setstudentLeaderBoards={setstudentLeaderBoards}
                            />
                        ))}
                        {isTeacher && (
                            <button className='add-quiz-btn' onClick={handleAddQuizClick}>Add Quiz</button>
                        )}
                    </div>
                </>
            )}

            {showForm && (
                <div className="overlay d-flex justify-content-center align-items-center">
                    <div className="overlay-form bg-white p-4 rounded shadow" style={{ width: '400px', position: 'relative' }}>
                        <button
                            className="btn-close position-absolute top-0 end-0 m-3"
                            onClick={handleCancel}
                            aria-label="Close"
                        ></button>

                        <h3 className="mb-4">Add New Quiz</h3>

                        {/* ✅ Error alert */}
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}

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
                                onChange={(e) => setQuizTime(parseInt(e.target.value))}
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
