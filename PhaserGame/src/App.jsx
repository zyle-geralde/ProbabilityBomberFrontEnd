import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PhaserGame from './pages/PhaserGame'
import { Component } from "react";

import * as AuthController from './controllers/AuthController';

import HomePage from './pages/Homepage'
import BeginnerStageMenu from './pages/BeginnerStage'

import ViewStates from './enums/ViewStates';

import LoginForm from './components/forms/LoginForm';  // import LoginForm component
import RegisterForm from './components/forms/RegisterForm';  // import RegisterForm component
import Password from './components/forms/UpdatePasswordForm';  // import Password component
import ForgotPassword from './components/forms/ForgotPasswordForm';  // import ForgotPassword component
import Profile from './components/views/ProfileComponent';  // import Profile component
import PasswordResetLink from './components/views/PasswordResetLinkComponent';  // import Profile component


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',      // Renamed name to userName
      email: '',
      password: '',
      error: null,
      userData: null,
      currentView: ViewStates.GAME,  // Can be 'login', 'register', or 'profile'
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = () => AuthController.loginUser(this);
  handleRegister = () => AuthController.registerUser(this);
  handleForgotPassword = () => AuthController.forgotPassword(this);
  handleUpdatePassword = () => AuthController.updatePassword(this);
  render(){
    const { userName, email, password, error, userData, currentView } = this.state;
    return (
      <Router>
        <div>
        {currentView === ViewStates.LOGIN && (
          <LoginForm
            email={email}
            password={password}
            onChange={this.handleChange}
            onLogin={this.handleLogin}
            onForgotPassword={() => this.setState({ currentView: ViewStates.FORGOT_PASSWORD })}
            error={error}
          />
        )}
        {currentView === ViewStates.REGISTER && (
          <RegisterForm
            userName={userName}      // Pass userName instead of name
            email={email}
            password={password}
            onChange={this.handleChange}
            onRegister={this.handleRegister}
            error={error}
          />
        )}
        {currentView === ViewStates.PROFILE && (
          <Profile 
          userData={userData}
          onUpdatePassword={() => this.setState({ currentView: ViewStates.PASSWORD })} 
          />
        )}
        {currentView === ViewStates.PASSWORD && (
          <Password
            password={password}
            onChange={this.handleChange}
            onUpdate={this.handleUpdatePassword}
          />
        )}
        {currentView === ViewStates.FORGOT_PASSWORD && (
            <ForgotPassword
            email={email}
            onChange={this.handleChange}
            onForgotPassword={this.handleForgotPassword}
          />
        )}
        {currentView === ViewStates.PASSWORD_RESET_LINK && (
            <PasswordResetLink
            userData={userData}
            onLogin={() => this.setState({ currentView: ViewStates.LOGIN })}
          />
        )}
        </div>
        {currentView === ViewStates.GAME && (
          <Routes>
            <Route path="/phaserGame" element={<PhaserGame />} />
          </Routes>
        )}
        {currentView === ViewStates.HOME && (
          <Routes>
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/homePage/beginnerStage" element={<BeginnerStageMenu />} />
          </Routes>
        )}

      </Router>
    );
  }
}

export default App;