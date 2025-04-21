import { useEffect, useState } from 'react';
import { useShowStudents, useRemoveStudentFromClass } from '../../../hooks/UseTeacher';

function RemoveStudentFromClass({ className }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

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

  return (
    <div>
      <h3>Students in {className}</h3>
      {loadingStudents ? (
        <p>Loading students...</p>
      ) : (
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              {student}
              <button onClick={() => handleRemove(student)} disabled={removing && selectedStudent === student}>
                {removing && student === selectedStudent ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default RemoveStudentFromClass;