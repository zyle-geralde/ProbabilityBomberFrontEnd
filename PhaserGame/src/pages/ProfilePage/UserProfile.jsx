import React from 'react';
import {useNavigate } from 'react-router-dom';
import StudentProfile from './StudentProfile';
import TeacherProfile from '../../components/views/teacher/TeacherProfile';
import * as AuthController from '../../controllers/AuthController';
import ViewStates from '../../enums/ViewStates';

function ProfilePage() {
  const navigate = useNavigate();
  const isTeacher = AuthController.getCurrentUserRole();
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log("userData: ",userData);

  return isTeacher ? (
    <TeacherProfile
      userData={userData}
      onUpdatePassword={() => navigate(ViewStates.PASSWORD)} 
    />
  ) : (
    <StudentProfile
      userData={userData}
      onUpdatePassword={() => navigate(ViewStates.PASSWORD)}
    />
  );
}

export default ProfilePage;
