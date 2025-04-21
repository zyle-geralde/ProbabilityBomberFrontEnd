import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import PhaserGame from './pages/PhaserGame'
import { useEffect, useState } from "react";

import * as AuthController from './controllers/AuthController';

import HomePage from './pages/Homepage'
import BeginnerStageMenu from './pages/BeginnerStage'

import ViewStates from './enums/ViewStates';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import Password from './components/forms/UpdatePasswordForm';
import ForgotPassword from './components/forms/ForgotPasswordForm';
import StudentProfile from './components/views/StudentProfile'; 
import TeacherProfile from './components/views/teacher/TeacherProfile';
import PasswordResetLink from './components/views/PasswordResetLink';

export function App() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'userName':
        setUserName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'role':
        setRole(value);
        break;
      default:
        break;
    }
  };
  
  const handleLogin = () => AuthController.loginUser({ email, password, role, setUserData, setError, navigate });
  const handleRegister = () => AuthController.registerUser({ userName, email, password, role, setError, navigate });
  const handleUpdatePassword = () => AuthController.updatePassword({ password, setError, navigate });
  const handleForgotPassword = () => AuthController.forgotPassword({ email, setError, setUserData, navigate });

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginForm
              email={email}
              password={password}
              role={role}
              onChange={handleChange}
              onLogin={handleLogin}
              onForgotPassword={() => navigate(ViewStates.FORGOT_PASSWORD)}
              error={error}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterForm
              userName={userName}
              email={email}
              password={password}
              role={role}
              onChange={handleChange}
              onRegister={handleRegister}
              error={error}
            />
          }
        />
        <Route
          path="/teacher_profile"
          element={
            userData ? (
            <TeacherProfile
            userData={userData}
            onUpdatePassword={() => navigate(ViewStates.PASSWORD)}
            />) : (
              <p>Loading...</p>
            )
          }
        />
        <Route
          path="/password"
          element={
            <Password
              password={password}
              onChange={handleChange}
              onUpdate={handleUpdatePassword}
              error={error}
            />
          }
        />
        <Route
          path="/forgot_password"
          element={
            <ForgotPassword
              email={email}
              onChange={handleChange}
              onForgotPassword={handleForgotPassword}
              error={error}
            />
          }
        />
        <Route
          path="/password_reset_link"
          element={
            <PasswordResetLink
              userData={userData}
              onLogin={() => navigate(ViewStates.LOGIN)}
            />
          }
        />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/homePage/beginnerStage" element={<BeginnerStageMenu />} />
        <Route path="/phaserGame" element={<PhaserGame />} />
      </Routes>
    </div>
  );
}