import { useState } from 'react';
import TeacherClasses from './TeacherClasses';

function TeacherProfile({ userData, onUpdatePassword }) {
  const createdDate = new Date(userData.createdAt._seconds * 1000 + userData.createdAt._nanoseconds / 1000000);
  const formattedDate = createdDate.toLocaleString();

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {userData.email}</p>
      <p>Name: {userData.name}</p>
      <p>Created At: {formattedDate}</p>
      <button onClick={onUpdatePassword}>Update Password</button>
      <hr />
      <TeacherClasses />
    </div>
  );
}
export default TeacherProfile;