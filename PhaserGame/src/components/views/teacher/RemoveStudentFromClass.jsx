import { useEffect, useState } from 'react';
import { useShowStudents, useRemoveStudentFromClass,  useAddStudentToClass } from '../../../hooks/UseTeacher';

//import AddStudentToClass from '../../forms/AddStudentToClass';
import './RemoveStudentTable.css';

function RemoveStudentFromClass({ className }) {
  const [inputValue, setInputValue] = useState("");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [showModal, setShowModal] = useState(false);
  const { students, loading: loadingStudents } = useShowStudents(className, refreshKey);
  // const {success, loading: removing} = useRemoveStudentFromClass(className, selectedStudent)
  const {remove, loading: removing, success, reset} = useRemoveStudentFromClass()

  useEffect(() => {
    if (success) {
      setRefreshKey(prev => prev + 1); // This causes useShowStudents to refetch
      setSelectedStudent(null); // Clear Selection
      reset();
    }
  }, [success]);

  const handleRemove = (student) => {
    setSelectedStudent(student);
    remove(className, student);
  };

  const handleAddStudent = () => {
        useAddStudentToClass(className, inputValue)
    }

  return (
    <div>
      <div class="classroom-header">
          <div class="classroom-details">
            <h1>{className}</h1>
            
          </div>

          
      </div>
      {loadingStudents ? (
        <p>Loading students...</p>
      ) : (
        <>

            <div class="student-list">
              {students.map((student, index) => (
                <div class="student-item">
                  <div class="student-details">
                      
                      <p>{student}</p>
                    </div>
                  
                    <div  class="student-action">

                    </div>
                </div>
              ))}
            </div>
        </>
        
      )}
      
       {showModal && (
        <div className="modal-overlay">
          <div className="modal-content teacher-dashboard">
            <div>
                <h3>Add Student in {className}</h3>
                <input
                  type="text"
                  placeholder="Student Name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={() => handleAddStudent()}>Add Student</button>
            </div>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default RemoveStudentFromClass;