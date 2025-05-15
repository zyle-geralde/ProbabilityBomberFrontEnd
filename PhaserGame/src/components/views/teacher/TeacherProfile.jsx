import { useState } from 'react';
import TeacherClasses from './TeacherClasses';
import QuestionCreation from '../../views/question/QuestionCreation'
import CreateClass from '../../forms/CreateClass'
import LogoutButton from '../LogoutButton';

function TeacherProfile({ userData, onUpdatePassword }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const createdDate = new Date(userData.createdAt._seconds * 1000 + userData.createdAt._nanoseconds / 1000000);
  const formattedDate = createdDate.toLocaleString();

  return (
    <div>
      {localStorage.getItem("token") && <LogoutButton />}
      <QuestionCreation/>
      <h1>User Profile</h1>
      <p>Email: {userData.email}</p>
      <p>Name: {userData.name}</p>
      <p>Created At: {formattedDate}</p>
      <button onClick={onUpdatePassword}>Update Password</button>
      <hr />
      <CreateClass setRefreshKey={setRefreshKey}/>
      <hr />
      <TeacherClasses refreshKey={refreshKey}/>
    </div>
  );
}
export default TeacherProfile;