import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import * as AuthController from './controllers/AuthController';

import PhaserGame from './pages/PhaserGame'
import ViewStates from './enums/ViewStates';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import Password from './components/forms/UpdatePasswordForm';
import ForgotPassword from './components/forms/ForgotPasswordForm';
// import StudentProfile from './components/views/StudentProfile'; 
import TeacherProfile from './components/views/teacher/TeacherProfile';
import PasswordResetLink from './components/views/PasswordResetLink';
import LessonPage from "./pages/LessonPage/LessonPage";
import QuizSettingPage from "./pages/QuizSettingPage/QuizSettingPage";
import ClassPage from "./pages/ClassPage/ClassPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
// import ProfilePage from "./pages/ProfilePage/UserProfile";
import ClassPerformancePage from "./pages/PerformanceTracking/ClassPerformancePage";
import LessonResourcePage from "./pages/LessonPage/LessonResourcePage/LessonResourcePage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import PhaserGameSetUp from "./pages/GamePage/PhaserGame";

// Authentication Pages
import LoginPage from "./pages/AuthenticationPages/LoginPage";
import RegisterPage from "./pages/AuthenticationPages/RegisterPage";
import ForgotPasswordPage from "./pages/AuthenticationPages/ForgotPasswordPage";
import ResetPasswordLinkPage from "./pages/AuthenticationPages/ResetPasswordLinkPage";
import ResetPasswordPage from "./pages/AuthenticationPages/ResetPasswordPage";
import EmailConfirmationPage from "./pages/AuthenticationPages/EmailConfirmationPage";


// Stage Pages
import StagePage from "./pages/StagePages/StagePageTemplate";
import Stage01Page from "./pages/StagePages/Stage01Page";
import Stage02Page from "./pages/StagePages/Stage02Page";
import Stage03Page from "./pages/StagePages/Stage03Page";
import TutorialPage from "./pages/StagePages/TutorialPage";


export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');

  // Clear error on route change
  useEffect(() => {
    setError(null);
  }, [location.pathname]);


  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'fullName':
      setFullName(value);
      break;
      case 'userName':
        setUserName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'role':
        setRole(value);
        break;
      default:
        break;
    }
  };
  
  const handleLogin = () => AuthController.loginUser({ email, password, role, setUserData, setError, navigate });
  const handleRegister = () => AuthController.registerUser({ fullName, userName, email, password, confirmPassword, setError, navigate });
  const handleUpdatePassword = () => AuthController.updatePassword({ password, setError, navigate });
  const handleForgotPassword = () => AuthController.forgotPassword({ email, setError, setUserData, navigate });

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage 
              email={email}
              password={password}
              role={role}
              onChange={handleChange}
              onLogin={handleLogin}
              onForgotPassword={() => navigate(ViewStates.FORGOT_PASSWORD)}
              error={error}
              setRole={setRole}
              />
            } 
          />

        <Route path="/" element={<LoginPage 
              email={email}
              password={password}
              role={role}
              onChange={handleChange}
              onLogin={handleLogin}
              onForgotPassword={() => navigate(ViewStates.FORGOT_PASSWORD)}
              error={error}
              setRole={setRole}
              />} />


        <Route
          path="/register"
          element={
            <RegisterPage
              onRegister={handleRegister}
              fullName={fullName}
              userName={userName}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              onChange={handleChange}
              error={error}
            />
          }
        />

        <Route path="/studentProfile" element={<ProfilePage />} />

        <Route
          path="/registerForTeachers"
          element={
            <RegisterForm
              userName={userName}
              email={email}
              password={password}
              role={role}
              onChange={handleChange}
              onRegister={handleRegister}
              error={error}
              setRole={ setRole}
            />
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
            <ForgotPasswordPage
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
        <Route path="/reset-password-link" element={<ResetPasswordLinkPage 
              userData={userData}
              onLogin={() => navigate(ViewStates.LOGIN)}/>} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/email-confirmation" element={<EmailConfirmationPage />} />
        

        <Route path="/stagePage" element={<StagePage userData={userData} />} />
        <Route path="/stage01Page" element={<Stage01Page userData={userData} />} />
        <Route path="/stage02Page" element={<Stage02Page userData={userData} />} />
        <Route path="/stage03Page" element={<Stage03Page userData={userData} />} />
        <Route path="/tutorialPage" element={<TutorialPage userData={userData} />} />

        <Route path="/phaserGame" element={<PhaserGameSetUp></PhaserGameSetUp>} />
        <Route path="/lessonPage" element={userData?(<LessonPage
          userData={ userData}
        /> ):(<div>Loading ...</div>)}  />
        <Route path="/viewQuiz" element={<QuizSettingPage />} />
        <Route path="/addQuiz" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <QuizSettingPage />
          </ProtectedRoute>
          } />
        <Route path="/classPage" element={userData?(<ClassPage
          userData={userData}
          setUserData = {setUserData}
        /> ):(<div>Loading ...</div>)} />
        
        <Route 
          path="/profilePage" 
          element={
            userData ? (
              <ProfilePage userData={userData} 
              password={password}
              onChange={handleChange}
              onUpdate={handleUpdatePassword}
              error={error} />
            ) : (
              <div>Loading...</div>
            )
          } 
        />
        <Route path="/classPerformancePage" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <ClassPerformancePage/>
          </ProtectedRoute>
        }/>
        <Route path="/topic/:topicTarget" element={<LessonResourcePage />} />
      </Routes>
    </div>
  );
}