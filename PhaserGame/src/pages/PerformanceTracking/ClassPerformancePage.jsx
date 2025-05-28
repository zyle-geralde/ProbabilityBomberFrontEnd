import React, { useState, useEffect } from 'react';
import './ClassPerformancePage.css';
import HomeNavbar from '../../components/navbar/HomeNavbar';
import { useGetAllQuiz } from '../../hooks/UseQuiz';
import { useGetAllStudentInformation } from '../../hooks/UseQuiz';
import { useLocation } from 'react-router-dom';
import { useUpdateStudentInformation } from '../../hooks/UseQuiz';
import { useDeleteStudentInformation } from '../../hooks/UseQuiz'; // Import the new hook for deletion

function ClassPerformancePage() {
  const [rawQuizPerformanceData, setAllStudentQuizData] = useState([]);
  const [loadingme, setLoading] = useState(true);
  const [errorme, setError] = useState(null);
  const [quizNames, setQuizNames] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [classTitle, setClassTitle] = useState([]);

  const [studentsTransformedData, setStudentsTransformedData] = useState([]);
  const [openStudentName, setOpenStudentName] = useState(null);

  // State for the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditStudent, setCurrentEditStudent] = useState(null);
  const [currentEditQuiz, setCurrentEditQuiz] = useState(null);
  const [editScore, setEditScore] = useState('');
  const [editAttempts, setEditAttempts] = useState('');
  const [editDuration, setEditDuration] = useState('');

  // New state for the delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentDeleteStudent, setCurrentDeleteStudent] = useState(null);
  const [currentDeleteQuiz, setCurrentDeleteQuiz] = useState(null);

  const { data: quizzes, loading: loadingQuizzes, error: errorQuizzes } = useGetAllQuiz();
  const location = useLocation();
  const uid = location.state?.classId;
  const classId = uid;

  useEffect(() => {
    console.log("Current allStudentQuizData:", rawQuizPerformanceData);
  }, [rawQuizPerformanceData]);

  useEffect(() => {
    if (!loadingQuizzes && !errorQuizzes && quizzes?.allQuizzes) {
      const filteredList = quizzes.allQuizzes.filter(quiz => quiz.classIds[0] == classId);
      setQuizNames(filteredList.map(quiz => quiz.quizName));
      setQuizList(filteredList);
    }
  }, [quizzes, loadingQuizzes, errorQuizzes, classId]);

  useEffect(() => {
    const fetchAllStudentData = async () => {
      if (quizNames.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const promises = quizNames.map(quizName =>
          useGetAllStudentInformation(quizName)
        );

        const results = await Promise.all(promises);
        console.log("Results from useGetAllStudentInformation:", results);

        const transformedData = [];
        results.forEach(result => {
          if (result?.response?.data) {
            if (typeof result.response.data.allQuizInformation === 'object' && result.response.data.allQuizInformation !== null) {
              result.response.data.allQuizInformation.Quizname = "hello";
            }
            transformedData.push(result.response.data);
          } else {
            console.warn("Received unexpected data structure for quiz:", result);
          }
        });
        setAllStudentQuizData(transformedData);

      } catch (err) {
        console.error("Error fetching all student quiz data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStudentData();
  }, [quizNames]);

  useEffect(() => {
    const transformedData = {};
    console.log("RAWWW:", rawQuizPerformanceData);

    rawQuizPerformanceData.forEach((quizEntry, index) => {
      if (quizEntry?.allQuizInformation) {
        const quizName = quizNames[index];
        const studentsInQuiz = quizEntry.allQuizInformation[Object.keys(quizEntry.allQuizInformation)[0]];
        setClassTitle(Object.keys(quizEntry.allQuizInformation)[0]);

        if (Array.isArray(studentsInQuiz)) {
          studentsInQuiz.forEach(studentRecord => {
            const studentName = Object.keys(studentRecord)[0];
            const performanceDetails = studentRecord[studentName];

            if (!transformedData[studentName]) {
              transformedData[studentName] = {
                name: studentName,
                quizzes: []
              };
            }
            transformedData[studentName].quizzes.push({
              title: quizName,
              score: performanceDetails.score,
              timeCompletion: performanceDetails.timeCompletion,
              noAttempts: performanceDetails.noAttempts
            });
          });
        } else {
          console.warn(`Students data for quiz '${quizName}' is not an array:`, studentsInQuiz);
        }
      } else {
        console.warn("quizEntry.allQuizInformation is missing or malformed:", quizEntry);
      }
    });

    setStudentsTransformedData(Object.values(transformedData));
  }, [rawQuizPerformanceData, quizNames]); // Added quizNames to dependency array for accuracy

  const handleStudentClick = (studentName) => {
    setOpenStudentName(openStudentName === studentName ? null : studentName);
  };

  // --- Functions for handling edit modal ---
  const handleEditClick = (student, quiz) => {
    setCurrentEditStudent(student);
    setCurrentEditQuiz(quiz);
    setEditScore(quiz.score);
    setEditAttempts(quiz.noAttempts);
    setEditDuration(quiz.timeCompletion);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setCurrentEditStudent(null);
    setCurrentEditQuiz(null);
    setEditScore('');
    setEditAttempts('');
    setEditDuration('');
  };

  const handleSaveEdit = async () => {
    let object_payload = {
      "quizName": currentEditQuiz.title,
      "className": classTitle,
      "studentName": currentEditStudent.name,
      "studentInformation": {
        [classTitle]: {
          [currentEditStudent.name]: {
            "score": editScore,
            "timeCompletion": editDuration,
            "noAttempts": editAttempts
          }
        }
      }
    };

    const { success, response, error } = await useUpdateStudentInformation(object_payload);

    if (success) {
      console.log("Updated student Info ", response);

      // Update the local state to reflect the changes
      setStudentsTransformedData(prevData => {
        return prevData.map(student => {
          if (student.name === currentEditStudent.name) {
            return {
              ...student,
              quizzes: student.quizzes.map(quiz => {
                if (quiz.title === currentEditQuiz.title) {
                  return {
                    ...quiz,
                    score: editScore,
                    noAttempts: editAttempts,
                    timeCompletion: editDuration
                  };
                }
                return quiz;
              })
            };
          }
          return student;
        });
      });
    } else {
      console.error("Failed to update student Info ", response);
      // Optionally, you might want to show an error message to the user here
    }

    handleModalClose(); // Close the modal after saving
  };

  // --- New functions for handling delete modal ---
  const handleDeleteClick = (student, quiz) => {
    setCurrentDeleteQuiz(quiz)
    setCurrentDeleteStudent(student)
    setCurrentEditStudent(student);
    setCurrentEditQuiz(quiz);
    setEditScore(quiz.score);
    setEditAttempts(quiz.noAttempts);
    setEditDuration(quiz.timeCompletion);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setCurrentDeleteQuiz('')
    setCurrentDeleteStudent('')
    setIsDeleteModalOpen(false);
    setCurrentEditStudent(null);
    setCurrentEditQuiz(null);
    setEditScore('');
    setEditAttempts('');
    setEditDuration('');
  };

  const handleConfirmDelete = async () => {
    let object_payload = {
      "quizName": currentEditQuiz.title,
      "className": classTitle,
      "studentName": currentEditStudent.name,
      "studentInformation": {
        [classTitle]: {
          [currentEditStudent.name]: {
            "score": editScore,
            "timeCompletion": editDuration,
            "noAttempts": editAttempts
          }
        }
      }
    };

    const { success, response, error } = await useDeleteStudentInformation(object_payload);

    if (success) {
      console.log("Deleted student info:", response);
      // Remove the deleted quiz from the local state
      setStudentsTransformedData(prevData => {
        return prevData.map(student => {
          if (student.name === currentDeleteStudent.name) {
            return {
              ...student,
              quizzes: student.quizzes.filter(quiz => quiz.title !== currentDeleteQuiz.title)
            };
          }
          return student;
        }).filter(student => student.quizzes.length > 0); // Optionally remove student if no quizzes left
      });
    } else {
      console.error("Failed to delete student info:", error);
      // Optionally, show an error message
    }

    handleDeleteModalClose(); // Close the modal after attempted deletion
  };

  // --- End new functions for delete ---

  if (loadingQuizzes || loadingme) {
    return <div>Loading student performance data...</div>;
  }

  if (errorQuizzes) {
    return <div>Error loading quizzes: {errorQuizzes.message}. Please try again later.</div>;
  }

  if (errorme) {
    return <div>Error loading student performance: {errorme.message}. Please try again later.</div>;
  }

  return (
    <>
      <HomeNavbar />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          height: "auto",
          minHeight: "500px",
          width: "70%",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "grey",
          marginTop: "30px",
          marginBottom: "30px",
          borderRadius: "10px",
          padding: "20px",
          boxSizing: "border-box"
        }}>
          <h2 style={{ textAlign: "center", marginBottom: "25px", color: "#333" }}>Student Performance Overview</h2>

          <div className="student-list-container">
            {studentsTransformedData.length > 0 ? (
              studentsTransformedData.map((student) => (
                <div key={student.name} className="student-accordion-item">
                  <div
                    className="student-accordion-header"
                    onClick={() => handleStudentClick(student.name)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px",
                      backgroundColor: "#f5f5f5",
                      borderBottom: "1px solid #eee",
                      cursor: "pointer",
                      borderRadius: openStudentName === student.name ? "10px 10px 0 0" : "10px",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: "1.1em", color: "#555" }}>Student: {student.name}</h3>
                    <span style={{ fontSize: "1.2em", color: "#777" }}>
                      {openStudentName === student.name ? '▲' : '▼'}
                    </span>
                  </div>

                  {openStudentName === student.name && (
                    <div className="student-accordion-content" style={{
                      padding: "15px",
                      border: "1px solid #eee",
                      borderTop: "none",
                      borderRadius: "0 0 10px 10px",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
                    }}>
                      <h4 style={{ marginTop: "0", marginBottom: "15px", color: "#666" }}>Quizzes Taken:</h4>
                      <div className="quizzes-grid" style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: "15px",
                      }}>
                        {student.quizzes.length > 0 ? (
                          student.quizzes.map((quiz, quizIndex) => (
                            <div key={`${student.name}-${quiz.title}-${quizIndex}`} className="quiz-card" style={{
                              border: "1px solid #ddd",
                              borderRadius: "8px",
                              padding: "15px",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                              backgroundColor: "#fefefe",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between"
                            }}>
                              <h5 style={{ marginTop: "0", marginBottom: "10px", color: "#444" }}>Quiz: {quiz.title}</h5>
                              <p style={{ margin: "0", fontSize: "0.9em", color: "#666" }}>Score: <strong>{quiz.score}</strong></p>
                              <p style={{ margin: "5px 0 0", fontSize: "0.85em", color: "#888" }}>Time: {quiz.timeCompletion}s</p>
                              <p style={{ margin: "5px 0 10px", fontSize: "0.85em", color: "#888" }}>Attempts: {quiz.noAttempts}</p>
                              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <button
                                  onClick={() => handleEditClick(student, quiz)}
                                  style={{
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    fontSize: "0.9em",
                                    flexGrow: 1,
                                    transition: "background-color 0.2s ease"
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(student, quiz)}
                                  style={{
                                    backgroundColor: "#dc3545", // Red color for delete
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    fontSize: "0.9em",
                                    flexGrow: 1,
                                    transition: "background-color 0.2s ease"
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p style={{ color: "#888", fontStyle: "italic" }}>No quizzes recorded for this student.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", color: "#888", fontStyle: "italic", marginTop: "20px" }}>
                No student performance data available for this class yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Edit Performance Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            width: "400px",
            maxWidth: "90%",
            textAlign: "center"
          }}>
            <h3 style={{ marginBottom: "20px", color: "#333" }}>Edit Quiz Performance</h3>
            {currentEditStudent && currentEditQuiz && (
              <>
                <p><strong>Student:</strong> {currentEditStudent.name}</p>
                <p><strong>Quiz:</strong> {currentEditQuiz.title}</p>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Score:</label>
                  <input
                    type="number"
                    value={editScore}
                    onChange={(e) => setEditScore(e.target.value)}
                    style={{
                      width: "calc(100% - 20px)",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                      fontSize: "1em"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Attempts:</label>
                  <input
                    type="number"
                    value={editAttempts}
                    onChange={(e) => setEditAttempts(e.target.value)}
                    style={{
                      width: "calc(100% - 20px)",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                      fontSize: "1em"
                    }}
                  />
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "5px", color: "#555" }}>Duration (seconds):</label>
                  <input
                    type="number"
                    value={editDuration}
                    onChange={(e) => setEditDuration(e.target.value)}
                    style={{
                      width: "calc(100% - 20px)",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ddd",
                      fontSize: "1em"
                    }}
                  />
                </div>
                <div className="modal-actions" style={{ display: "flex", justifyContent: "space-around" }}>
                  <button
                    onClick={handleModalClose}
                    style={{
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      cursor: "pointer",
                      fontSize: "1em"
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      cursor: "pointer",
                      fontSize: "1em"
                    }}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay" style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            width: "400px",
            maxWidth: "90%",
            textAlign: "center"
          }}>
            <h3 style={{ marginBottom: "20px", color: "#dc3545" }}>Confirm Deletion</h3>
            {currentDeleteStudent && currentDeleteQuiz && (
              <>
                <p>Are you sure you want to delete the performance record for **{currentDeleteStudent.name}** on quiz **{currentDeleteQuiz.title}**?</p>
                <p style={{ color: "#888", fontSize: "0.9em" }}>This action cannot be undone.</p>
                <div className="modal-actions" style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                  <button
                    onClick={handleDeleteModalClose}
                    style={{
                      backgroundColor: "#6c757d",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      cursor: "pointer",
                      fontSize: "1em"
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      cursor: "pointer",
                      fontSize: "1em"
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ClassPerformancePage;