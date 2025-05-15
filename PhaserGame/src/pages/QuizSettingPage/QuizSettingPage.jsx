import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './QuizSettingPage.css';
import HomeNavbar from '../../components/navbar/HomeNavbar';

export default function QuizSettingPage() {

  //check if it is "/addQuiz" Route
  const location = useLocation();
  const isAddQuizRoute = location.pathname === '/addQuiz';
  const alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const [questions, setQuestions] = useState([
    { question: '', numerator: '', denominator: '', probability: '', events: ["1 or 2 when dice is rolled", "hellow b"], isNew: false },
    { question: '', numerator: '', denominator: '', probability: '', events: ["3 or 4 when dice is rolled", "hellow c", "hellow cc"], isNew: false },
    { question: '', numerator: '', denominator: '', probability: '', events: ["5 or 6 when dice is rolled", "hellow d", "hellow cd", "hellow ddd"], isNew: false },
  ]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState(null); // "deleteQuestion" or "deleteQuiz"
  const [targetIndex, setTargetIndex] = useState(null);

  const handleAddQuestion = () => {
    setQuestions([
      { question: '', numerator: '', denominator: '', probability: '',events: [], isNew: true },
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

  const handleSaveConfirm = () => {
    setConfirmType("saveQuiz");
    setShowConfirm(true)
  }

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

  const handleChange = (index, field, value, indxx = null) => {
    const updatedQuestions = [...questions];
    if (field == "events") {
      updatedQuestions[index][field][indxx] = value;
    }
    else {
      updatedQuestions[index][field] = value;
    }

    setQuestions(updatedQuestions);
    console.log(updatedQuestions)
  };

  const handleSave = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isNew = false;
    setQuestions(updatedQuestions);
    
  };

  const handleEventDeletion = (index, field, indxx) => {
    const updatedQuestions = [...questions];

    updatedQuestions[index][field].splice(indxx, 1)
    setQuestions(updatedQuestions)
  }
  const handleAddevents = (index, field) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field].push('')
    setQuestions(updatedQuestions)
  }

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
                    <div className='d-flex flex-column align-items-start fw-bold' style={{ fontSize: "12px" }}>
                      <div>Description: </div>
                      <input
                        type="text"
                        className="quiz-settings-input"
                        placeholder="Enter question"
                        value={q.question}
                        onChange={(e) => handleChange(index, 'question', e.target.value)}
                      />


                      { /*For Events*/}
                      <div className='w-75 ms-3'>
                        {q.events.map((js, indx) => (
                          <div className="d-flex flex-row align-items-center mt-2" key={indx}>
                            <div className="me-2 fw-bold">{alphanum[indx]}</div>
                            <div className='me-2 fw-bold'>=</div>
                            <input
                              type="text"
                              className="form-control"
                              value={js}
                              onChange={(e) => handleChange(index, "events", e.target.value, indx)}
                            />
                            <i
                              className="fas fa-trash-alt text-danger cursor-pointer ms-2"
                              style={{ cursor: 'pointer' }}
                              onClick={(e) => handleEventDeletion(index,"events",indx)}
                            ></i>
                          </div>

                        ))}
                      </div>

                      <div className="d-flex flex-row align-items-center mt-2 ms-3" onClick={(e)=>handleAddevents(index,"events")}>
                        <i className="fas fa-plus-circle"></i>
                        <div className="ms-2" style={{ cursor: "pointer" }}>Add Event</div>
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
                  <td className="quiz-settings-td" style={{ width: "150px" }}>
                    <input
                      type="number"
                      className="quiz-settings-input"
                      value={q.numerator}
                      onChange={(e) => handleChange(index, 'numerator', e.target.value)}
                    />
                  </td>
                  <td className="quiz-settings-td" style={{ width: "150px" }}>
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
        <div className='d-flex flex-row justify-content-end mt-2'>
          <button className="quiz-settings-add-question-button me-2" style={{padding:"10px 50px"}} onClick={handleSaveConfirm}> Save </button>
          {!isAddQuizRoute && <button className="quiz-settings-delete-quiz-button" onClick={handleQuizDeleteConfirm}> - Delete Quiz </button>}
          {isAddQuizRoute && <button className="quiz-settings-delete-quiz-button" onClick={handleQuizCancelConfirm}> - Cancel Quiz </button>}
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
                : confirmType === "cancelQuiz" ? "This will delete your unsaved work"
                  : confirmType === "saveQuiz" ? "Are you sure you want to save your work?"
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
