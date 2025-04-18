import * as AuthService from '../services/AuthenticationService';

import ViewStates from '../enums/ViewStates';

export const loginUser = async ({ email, password, role, setUserData, setError, navigate }) => {
  try {
    const token = await AuthService.firebaseLoginAndGetToken(email, password);
    localStorage.setItem("token", token);

    console.log("Role: ", role)
    const response = await AuthService.loginWithToken(token, role);
    const userData = response.data.userData;
    console.log("User Data: ", userData);

    localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData);

    if(role == 'student'){
      navigate(ViewStates.STUDENT_PROFILE);
    } else if (role == 'teacher'){
      navigate(ViewStates.TEACHER_PROFILE);
    }

  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    setError(error.message);
  }
};

export const registerUser = async ( { userName, email, password, role, setError, navigate } ) => {
  try {
    console.log(userName, email, password, role, setError, navigate )
    await AuthService.registerUser(userName, email, password, role);
    navigate( ViewStates.LOGIN );
  } catch (error) {
    console.error("Registration failed:", error.message);
    setError(error.message);
  }
};

export const updatePassword = async ( {password, setError, navigate} ) => {
  try {
    console.log("Password! ", password)
    await AuthService.resetPassword(password);
    navigate(ViewStates.LOGIN);
  } catch (error) {
    console.error("Password update failed:", error.message);
    setError( error.message );
  }
};

export const forgotPassword = async ( {email, setError, setUserData, navigate} ) => {
  try {
    const response = await AuthService.forgotPassword(email);
    navigate( ViewStates.PASSWORD_RESET_LINK)
    setUserData( response.data.resetLink)
  } catch (error) {
    console.error("Forgot password failed:", error.message);
    setError( error.message );
  }
};