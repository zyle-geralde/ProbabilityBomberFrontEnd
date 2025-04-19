import { useState } from 'react';
import RemoveStudentFromClass from './removeStudentFromClass';
import { useTeacherClasses } from '../../../hooks/UseTeacher';
import AddStudentToClass from '../../forms/AddStudentToClass';

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
      <hr />
      {selectedClass && <RemoveStudentFromClass className={selectedClass} />}
      <hr />
      {selectedClass && <AddStudentToClass className={selectedClass} />}
    </div>
  );
}
export default TeacherClasses;