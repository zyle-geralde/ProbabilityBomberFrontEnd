import { useEffect, useState } from 'react';
import RemoveStudentFromClass from './RemoveStudentFromClass';
import { useTeacherClasses, useRemoveClassFromTeacher } from '../../../hooks/UseTeacher';
import AddStudentToClass from '../../forms/AddStudentToClass';
import './TeacherClasses.css';

function TeacherClasses({refreshKey}) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [deleteSelectedClass, setDeleteSelectedClass] = useState(null);
  
  const {success, loading:removing, reset } = useRemoveClassFromTeacher(deleteSelectedClass);
  const { classes, loading } = useTeacherClasses(refreshKey, success);

  // <button onClick={ () => setDeleteSelectedClass(cls) }>Delete</button> :: replace later

  useEffect(() => {
    if (success) {
      setDeleteSelectedClass(null); // optional: clear selected
      reset();
    }
  }, [success]);

  return (
    <div class="item3">
      <h2>My Classes</h2>
      {loading || removing ? (
        <p>Loading classes...</p>
      ) : (
        <div class="class-tabs">
          {classes.map((cls, idx) => (
            <button key={idx} onClick={() => setSelectedClass(cls)} className={selectedClass === cls ? 'active' : ''}>
              {cls}
            </button>
          ))}
        </div>
      )}
      

      <div class="class-info-container">
        {selectedClass && <RemoveStudentFromClass className={selectedClass} />} 
      </div>
      <hr />
      
      <hr />
      {selectedClass && <AddStudentToClass className={selectedClass} />}
  </div>
  );
}
export default TeacherClasses;