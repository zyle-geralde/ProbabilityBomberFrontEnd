import * as AuthService from '../services/AuthenticationService';

import ViewStates from '../enums/ViewStates';

export const loginUser = async ({ email, password, role, setUserData, setError, navigate }) => {
  try {
    const token = await AuthService.firebaseLoginAndGetToken(email, password);
    localStorage.setItem("token", token);

    const response = await AuthService.loginWithToken(token, role);
    const userData = response.data.userData;

    localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData);
    
    if(role == 'student'){
      navigate(ViewStates.STUDENT_PROFILE);
    } else if (role == 'teacher') {
      navigate("/classPage", { state: { password } });
    }

  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    setError(error.message);
  }
};

export const registerUser = async ( { userName, email, password, role, setError, navigate } ) => {
  try {
    await AuthService.registerUser(userName, email, password, role);
    console.log("Good")
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

export const logoutUser = async ({ navigate }) => {
  try {
    await AuthService.fireBaseLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate(ViewStates.LOGIN);
     window.location.reload();
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};

{/*Added some Utility functions*/}

export const getCurrentUserRole = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const role = userData?.role;

  return {
    isTeacher: role === "teacher",
    isStudent: role === "student",
    role,
  };
};

export const getUsername = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return userData?.name || "Guest";
};