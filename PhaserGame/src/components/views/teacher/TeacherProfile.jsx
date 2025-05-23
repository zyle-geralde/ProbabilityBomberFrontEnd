import { useState } from 'react';
import TeacherClasses from './TeacherClasses';
import QuestionCreation from '../../views/question/QuestionCreation'
import CreateClass from '../../forms/CreateClass'
import LogoutButton from '../LogoutButton';
import './TeacherProfile.css';
import RemoveAQuestion from '../question/RemoveAQuestion';
import DeleteQuestion from '../question/DeleteQuestion';
import AddQuestionToQuiz from '../question/AddQuestionToQuiz';
import HomeNavbar from '../../navbar/HomeNavbar';

function TeacherProfile({ userData, onUpdatePassword }) {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const createdDate = new Date(userData.createdAt._seconds * 1000 + userData.createdAt._nanoseconds / 1000000);
  const formattedDate = createdDate.toLocaleString();

  // {localStorage.getItem("token") && <LogoutButton />} => 2 logout?
  /* 
    <hr />
          <h1>Create Question</h1>
          <QuestionCreation/>
          <hr />
          <RemoveAQuestion/>
          <hr />
          <DeleteQuestion/>
          <hr />
          <AddQuestionToQuiz/>
          <hr />
  */
  return (
    <>
      <div>
        <HomeNavbar />
      </div>
      <div class="body-container">
        <div class="profile-container">
          <div class="profile-header">
            <h1>User Profile</h1>
          </div>

          <div class="profile-content">
            <h1>{userData.name}</h1>

            <div class="profile-picture"></div>

            <ul class="profile-details">
              <li><strong>Email:</strong> {userData.email}</li>
              <li><strong>Created at:</strong> {formattedDate}</li>
            </ul>

            <button class="update-button" onClick={onUpdatePassword}>Update Password</button>
          </div>
          
        </div>

        
        
        <div class="teacher-dashboard">        
          <TeacherClasses refreshKey={refreshKey}/>
        </div>
        
        
        
      </div>
    </>
    
  );
}
export default TeacherProfile;