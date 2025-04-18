import { useShowStudents } from '../../hooks/UseTeacher';

function ClassStudents({ className }) {
  const { students, loading } = useShowStudents(className);

  return (
    <div>
      <h3>Students in {className}</h3>
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              {student}
              <button onClick={() => console.log(student)}>delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default ClassStudents;