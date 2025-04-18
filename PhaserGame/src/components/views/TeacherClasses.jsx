import { useState } from 'react';
import { useTeacherClasses } from '../../hooks/UseTeacher';
import ClassStudents from './ClassStudents';

function TeacherClasses() {
  const { classes, loading } = useTeacherClasses();
  const [selectedClass, setSelectedClass] = useState(null);

  return (
    <div>
      <h2>My Classes</h2>
      {loading ? (
        <p>Loading classes...</p>
      ) : (
        <ul>
          {classes.map((cls, idx) => (
            <li key={idx}>
              <button onClick={() => setSelectedClass(cls)}>{cls}</button>
            </li>
          ))}
        </ul>
      )}

      {selectedClass && <ClassStudents className={selectedClass} />}
    </div>
  );
}
export default TeacherClasses;