import * as UseTeacher from '../../hooks/UseTeacher';
import * as UseClass from '../../hooks/UseClass'
import { useState } from 'react';

function TeacherProfile({ userData, onUpdatePassword }) {
  const { classes, loading } = UseTeacher.useTeacherClasses()
  const [selectedClass, setSelectedClass] = useState(null);

  const { students, loading: studentLoading } = UseTeacher.useShowStudents(selectedClass);

  const createdDate = new Date(userData.createdAt._seconds * 1000 + userData.createdAt._nanoseconds / 1000000);
  const formattedDate = createdDate.toLocaleString(); // e.g. "4/6/2025, 10:30:15 AM"
  return(
    <div>
      <h1>User Profile</h1>
      <p>Email: {userData.email}</p>
      <p>Name: {userData.name}</p>
      <p>Created At: {formattedDate}</p>
      <button onClick={onUpdatePassword}>
        Update Password
      </button>
      <h2>My Classes</h2>
      {loading ? <p>Loading...</p> : (
        <ul>
          {classes.map((cls, idx) => (
            <li key={idx}>
              <button onClick={() => setSelectedClass(cls)}>
                {cls}
              </button>
            </li>
          ))}
        </ul>
      )}
      { selectedClass && (
        <>
        <h3>Students in {selectedClass}</h3>
        {studentLoading ? (
          <p>Loading students...</p>
        ) : (
          <ul>
            {students.map((student, index) => (
              <li key={index}>{student}</li>
            ))}
          </ul>
        )}
        </>
      ) }
    </div>
    );
  }
  export default TeacherProfile; 