import { useState } from 'react';
import TeacherClasses from './TeacherClasses';
import QuestionCreation from '../../views/question/QuestionCreation'
import CreateClass from '../../forms/CreateClass'
import LogoutButton from '../LogoutButton';
import './TeacherProfile.css';
function TeacherProfile({ userData, onUpdatePassword }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const createdDate = new Date(userData.createdAt._seconds * 1000 + userData.createdAt._nanoseconds / 1000000);
  const formattedDate = createdDate.toLocaleString();

  return (
    <div class="grid-container">
      {localStorage.getItem("token") && <LogoutButton />}
      <hr />
      <h1>Create Question</h1>
      <QuestionCreation/>
      <hr />
        <div class="item1">
            <nav>
                <div class="nav-items">
                    <a href="#">Home</a>
                    <a href="#">Users</a>
                    <a href="#">Ranking</a>
                    <a href="#">Topics</a>
                    <a href="#">Settings</a>
                </div>
            </nav>
        </div>

        <div class="item2">
        <h1>User Profile</h1>
        <ul>
            <li>Email: {userData.email}</li>
            <li>Name: {userData.name}</li>
            <li>Created at: {formattedDate}</li>
            <li><button onClick={onUpdatePassword}>Update Password</button></li>
        </ul>
        <hr />
        <CreateClass setRefreshKey={setRefreshKey}/>
        <hr />
        <TeacherClasses refreshKey={refreshKey}/>

        <div class="item5"><p>&copy; 2025 Groupo ni Zyle. All rights reserved.</p></div>
    </div>
  </div>
  );
}
export default TeacherProfile;