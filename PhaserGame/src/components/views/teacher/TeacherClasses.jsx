import { useEffect, useState } from 'react';
import RemoveStudentFromClass from './RemoveStudentFromClass';
import { useTeacherClasses, useRemoveClassFromTeacher } from '../../../hooks/UseTeacher';
import AddStudentToClass from '../../forms/AddStudentToClass';

function TeacherClasses({refreshKey}) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [deleteSelectedClass, setDeleteSelectedClass] = useState(null);
  
  const {success, loading:removing, reset } = useRemoveClassFromTeacher(deleteSelectedClass);
  const { classes, loading } = useTeacherClasses(refreshKey, success);

  useEffect(() => {
    if (success) {
      setDeleteSelectedClass(null); // optional: clear selected
      reset();
    }
  }, [success]);

  return (
    <div>
      <h2>My Classes</h2>
      {loading || removing ? (
        <p>Loading classes...</p>
      ) : (
        <ul>
          {classes.map((cls, idx) => (
            <li key={idx}>
              <h2>{cls}</h2>
              <button onClick={ () => setSelectedClass(cls) }>Show Students</button>
              <button onClick={ () => setDeleteSelectedClass(cls) }>Delete</button>
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