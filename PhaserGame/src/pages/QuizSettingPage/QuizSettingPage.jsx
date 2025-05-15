import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './QuizSettingPage.css';
import HomeNavbar from '../../components/navbar/HomeNavbar';

export default function QuizSettingPage() {

  //check if it is "/addQuiz" Route
  const location = useLocation();
  const isAddQuizRoute = location.pathname === '/addQuiz';

  const [questions, setQuestions] = useState([
    { question: '', numerator: '', denominator: '', probability: '' ,isNew: false },
    { question: '', numerator: '', denominator: '',probability: '',isNew: false },
    { question: '', numerator: '', denominator: '', probability: '',isNew: false },
  ]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState(null); // "deleteQuestion" or "deleteQuiz"
  const [targetIndex, setTargetIndex] = useState(null);

  const handleAddQuestion = () => {
    setQuestions([
      { question: '', numerator: '', denominator: '',probability: '', isNew: true },
      ...questions
    ]);
  };

  const handleDeleteConfirm = (index) => {
    setConfirmType("deleteQuestion");
    setTargetIndex(index);
    setShowConfirm(true);
  };

  const handleQuizDeleteConfirm = () => {
    setConfirmType("deleteQuiz");
    setShowConfirm(true);
  };

  const handleQuizCancelConfirm = () => {
    setConfirmType("cancelQuiz");
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (confirmType === "deleteQuestion" && targetIndex !== null) {
      const newQuestions = [...questions];
      newQuestions.splice(targetIndex, 1);
      setQuestions(newQuestions);
    } else if (confirmType === "deleteQuiz") {
      setQuestions([]);
    }
    handleCloseConfirm();
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setConfirmType(null);
    setTargetIndex(null);
  };

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSave = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isNew = false;
    setQuestions(updatedQuestions);
  };

  return (
    <>
      <div className="quiz-settings-navbar-container">
        <HomeNavbar />
      </div>

      <div className="quiz-settings-main-container">
        <div className='quiz-settings-title-container'>

          {!isAddQuizRoute && <h2>Quiz Setting & Editor</h2>}

          {/*contains name of the quiz, the difficuty, and the time*/}
          {isAddQuizRoute &&
            <div className="d-flex flex-row">
            <div className="d-flex flex-row align-items-center">
              <label className="me-2 text-white fw-bold">Name</label>
              <input className="form-control w-100" />
            </div>

            <div className="d-flex flex-row align-items-center">
              <label className="me-2 text-white fw-bold">Difficulty</label>
              <select className="form-select w-100">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="d-flex flex-row align-items-center">
              <label className="me-2 text-white fw-bold">Time (minutes)</label>
              <input type="number" className="form-control w-25" placeholder="ex. 30" min="1" />
            </div>
            </div>
          }
        </div>

        <div className='quiz-settings-special-btns-container'>
          {!isAddQuizRoute && <button className="quiz-settings-delete-quiz-button" onClick={handleQuizDeleteConfirm}> - Delete Quiz </button>}
          {isAddQuizRoute && <button className="quiz-settings-delete-quiz-button" onClick={handleQuizCancelConfirm}> - Cancel Quiz </button>}
          <button className="quiz-settings-add-question-button" onClick={handleAddQuestion}> + Add Question </button>
        </div>

        <div className="quiz-table-scrollable">
          <table className="quiz-settings-table">
            <thead>
              <tr>
                <th className="quiz-settings-th">Question</th>
                <th className="quiz-settings-th">Probability</th>
                <th className="quiz-settings-th">Numerator</th>
                <th className="quiz-settings-th">Denominator</th>
                <th className="quiz-settings-th">Action</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q, index) => (
                <tr key={index}>
                  <td className="quiz-settings-td">
                    <div className='d-flex flex-column align-items-start fw-bold' style={{fontSize:"12px"}}>
                      <div>Description: </div>
                    <input
                      type="text"
                      className="quiz-settings-input"
                      placeholder="Enter question"
                      value={q.question}
                      onChange={(e) => handleChange(index, 'question', e.target.value)}
                    />
                      
                    <div>
                        
                    </div>  
                      
                    <div className="d-flex flex-row align-items-center mt-2">
                      <i className="fas fa-plus-circle"></i>
                      <div className="ms-2" style={{cursor:"pointer"}}>Add Event</div> 
                    </div>
                     


                    </div>
                  </td>
                  <td className="quiz-settings-td">
                    <div className='d-flex flex-row fs-3'>
                      <div className="me-2">P(</div>
                      <input
                      type="text"
                      className="quiz-settings-input w-100"
                      value={q.probability}
                      placeholder='(A | B)'
                      onChange={(e) => handleChange(index, 'probability', e.target.value)}
                      />
                      <div className="ms-2">)</div>
                    </div>
                  </td>
                  <td className="quiz-settings-td" style={{width:"150px"}}>
                    <input
                      type="number"
                      className="quiz-settings-input"
                      value={q.numerator}
                      onChange={(e) => handleChange(index, 'numerator', e.target.value)}
                    />
                  </td>
                  <td className="quiz-settings-td" style={{width:"150px"}}>
                    <input
                      type="number"
                      className="quiz-settings-input"
                      value={q.denominator}
                      onChange={(e) => handleChange(index, 'denominator', e.target.value)}
                    />
                  </td>
                  <td className="quiz-settings-td">
                    <button
                      className="quiz-settings-delete-row-button"
                      onClick={() => handleDeleteConfirm(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Overlay */}
      {showConfirm && (
        <div className="overlay">
          <div className="overlay-form">
            <button className="close-btn" onClick={handleCloseConfirm}>&times;</button>
            <h3>Are you sure?</h3>
            <p>
              {confirmType === "deleteQuiz"
                ? "This will permanently delete the quiz and all questions."
                : confirmType === "cancelQuiz"? "This will delete your unsaved work"
                : "This will delete the selected question."}
            </p>
            <div className="form-buttons">
              <button onClick={handleConfirmDelete}>Confirm</button>
              <button onClick={handleCloseConfirm}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="quiz-settings-footer"></div>
    </>
  );
}
