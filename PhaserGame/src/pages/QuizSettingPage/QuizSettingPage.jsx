import React, { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './QuizSettingPage.css';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import { useCreateQuestion } from '../../hooks/UseQuestion';
import { useAddQuestionToQuiz } from '../../hooks/UseQuestion';
import { useEditQuestion } from '../../hooks/UseQuestion';
import { useGetAllQuestion, useRemoveAQuestion,useDeleteQuestion } from '../../hooks/UseQuestion';




function generateRandomId(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export default function QuizSettingPage({}) {
  

  //check if it is "/addQuiz" Route
  const navigate= useNavigate()
  const location = useLocation();
  const isAddQuizRoute = location.pathname === '/addQuiz';
  const alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const quizName = location.state?.quizName;
  const createdBy = location.state?.createdBy;


  useEffect(() => {
    if (quizName == null) {
      navigate("/lessonPage");
    }
  }, [quizName, navigate]);


  


  const [refreshKey, setRefreshKey] = useState(0);
  const { questions, loading } = useGetAllQuestion(refreshKey);
  const [localQuestions, setLocalQuestions] = useState([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState(null); // "deleteQuestion" or "deleteQuiz"
  const [targetIndex, setTargetIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (questions) {
    const filteredQuestions = questions.filter(q => q.questionName.split(' ')[2] === quizName);

    setLocalQuestions(filteredQuestions);
    console.log(localQuestions)
  }
}, [questions]);

  const handleAddQuestion = () => {
    const newId = generateRandomId();
    setLocalQuestions([
      { createdBy:createdBy ,questionName: "true "+newId+" "+quizName, questionDescription: "", numerator: "", denominator: "", probability: "", event: [] },
      ...localQuestions
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

  const  handleConfirmDelete = async () => {
    if (confirmType === "deleteQuestion" && targetIndex !== null) {
      const newQuestions = [...localQuestions];
      
      if (newQuestions[targetIndex].questionName.split(' ')[0] == "true") {
          newQuestions.splice(targetIndex, 1);
          setLocalQuestions(newQuestions);
      }
      else {
        const formData = {questionName: newQuestions[targetIndex].questionName, quizName: quizName }; // example formData

        const { success, error } = await useRemoveAQuestion(formData);

        if (success) {

          const { success, error } = await useDeleteQuestion(newQuestions[targetIndex].questionName );
          if (success) {
              console.log("Question removed successfully!");
          
              newQuestions.splice(targetIndex, 1);
              setLocalQuestions(newQuestions);
          // You can update UI state here or trigger other actions
          }
          else {
            console.error("Failed to remove question permanently:", error);
          // Show error to user, log, etc.
          }

        } else {
          console.error("Failed to remove question form quiz:", error);
          // Show error to user, log, etc.
        }
      }
    } else if (confirmType === "deleteQuiz") {
      setLocalQuestions([]);
    }
    handleCloseConfirm();
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setConfirmType(null);
    setTargetIndex(null);
  };

  const handleChange = (index, field, value, indxx = null) => {
    const updatedQuestions = [...localQuestions];
    if (field == "event") {
      updatedQuestions[index][field][indxx] = value;
    }
    else {
      updatedQuestions[index][field] = value;
    }

    setLocalQuestions(updatedQuestions);
    console.log(updatedQuestions)
  };

  const handleSave = async (index) => {
    //const newId = generateRandomId();
    const updatedQuestions = [...localQuestions];
    //updatedQuestions[index].isNew = false;
    if ((""+(updatedQuestions[index].questionDescription)).trim() == "" || (""+(updatedQuestions[index].numerator)).trim() == "" || (""+(updatedQuestions[index].denominator)).trim() == "" || updatedQuestions[index].event.length == 0 ||updatedQuestions[index].event.some(e => e.trim() === "")) {
      setErrorMessage("Please fill in all fields before saving.");
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }
    else {
      const firstWord = updatedQuestions[index].questionName.split(' ')[0];
      console.log(firstWord);
      if (firstWord == "true") {
        const updatedStr = updatedQuestions[index].questionName.replace(/^true/, "false");
        updatedQuestions[index].questionName = updatedStr

        const { createdBy, ...cleanedObject } = updatedQuestions[index];

        const { success, loading } =  await useCreateQuestion(cleanedObject);

        if (success) {
          console.log("success me")
          const { submit, success, loading } = await useAddQuestionToQuiz({questionName:updatedQuestions[index].questionName,quizName:quizName});

          if (success) {
            setSuccessMessage("Question saved successfully!");
            setTimeout(() => {
              setSuccessMessage("");
            }, 2000); 
          }
          else {
            setErrorMessage("Error on quizname");
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
          }

        }
        else {
          console.error("Error naman")
        }

      }
      else {

        const newObject = {
            ...updatedQuestions[index],
          originalQuestionName: updatedQuestions[index].questionName,
        };
        console.log(newObject)
        const { success, error } = await useEditQuestion(newObject);
        if (success) {
          setSuccessMessage('Question updated successfully!');
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000); 
        } else {
            setErrorMessage('Failed to update question.');
            setTimeout(() => {
              setErrorMessage("");
            }, 2000);
            console.error(error);
        }
        console.log("not true")
      }

      setLocalQuestions(updatedQuestions);
    }


  };

  const handleEventDeletion = (index, field, indxx) => {
    const updatedQuestions = [...localQuestions];

    updatedQuestions[index][field].splice(indxx, 1)
    setLocalQuestions(updatedQuestions)
  }
  const handleAddevents = (index, field) => {
    const updatedQuestions = [...localQuestions];
    updatedQuestions[index][field].push('')
    setLocalQuestions(updatedQuestions)
  }

  return (
    <>
      <div className="quiz-settings-navbar-container">
        <HomeNavbar />
      </div>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}


      <div className="quiz-settings-main-container">
        <div className='quiz-settings-title-container'>

          {!isAddQuizRoute && <h2>Quiz Setting & Editor</h2>}

          {/*contains name of the quiz, the difficuty, and the time*/}
          {/*isAddQuizRoute &&
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
            </div>*/
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
              {localQuestions.map((q, index) => (
                <tr key={index}>
                  <td className="quiz-settings-td">
                    <div className='d-flex flex-column align-items-start fw-bold' style={{ fontSize: "12px" }}>
                      <div>Description: </div>
                      <input
                        type="text"
                        className="quiz-settings-input"
                        placeholder="Enter question"
                        value={q.questionDescription}
                        onChange={(e) => handleChange(index, 'questionDescription', e.target.value)}
                      />


                      { /*For Events*/}
                      <div className='w-75 ms-3'>
                        {q.event.map((js, indx) => (
                          <div className="d-flex flex-row align-items-center mt-2" key={indx}>
                            <div className="me-2 fw-bold">{alphanum[indx]}</div>
                            <div className='me-2 fw-bold'>=</div>
                            <input
                              type="text"
                              className="form-control"
                              value={js}
                              onChange={(e) => handleChange(index, "event", e.target.value, indx)}
                            />
                            <i
                              className="fas fa-trash-alt text-danger cursor-pointer ms-2"
                              style={{ cursor: 'pointer' }}
                              onClick={(e) => handleEventDeletion(index, "event", indx)}
                            ></i>
                          </div>

                        ))}
                      </div>

                      <div className="d-flex flex-row align-items-center mt-2 ms-3" onClick={(e) => handleAddevents(index, "event")}>
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
                    <button className="quiz-settings-delete-row-button" style={{ backgroundColor: "green" }} onClick={() => handleSave(index)}> Save </button>
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
          <button className="quiz-settings-add-question-button me-2" style={{ padding: "10px 50px" }} onClick={handleSaveConfirm}> Done </button>
          {!isAddQuizRoute && <button className="quiz-settings-delete-quiz-button" onClick={handleQuizDeleteConfirm}> - Delete Quiz </button>}
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
