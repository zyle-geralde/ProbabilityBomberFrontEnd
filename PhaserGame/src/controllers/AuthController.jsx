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

export const registerUser = async ({ fullName, userName, email, password, confirmPassword, setError, navigate }) => {
  try {
    await AuthService.registerUser(fullName, userName, email, password, confirmPassword, setError, navigate);
    // console.log("Registration successful");
    setError(null);
    navigate( ViewStates.LOGIN );
    } catch (error) {
    // Axios errors contain response.data
    if (error.response && error.response.data && error.response.data.error) {
      setError(error.response.data.error); // show backend message
    } else {
      setError(error.message || "Registration failed, try again");
    }
    // console.error("Registration failed:", error.message);
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
    navigate("/email-confirmation")
    setUserData( response.resetLink)
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

{/*Added some Utility functions should create seperate util folder*/}

export const getUser = () => {
  return JSON.parse(localStorage.getItem("userData")) || null;
};

export const getFullName = () => getUser()?.fullname || "Guest";
export const getUsername = () => getUser()?.username || "Guest";
export const getEmail = () => getUser()?.email || "";
export const getDateCreated = () => {
  const user = JSON.parse(localStorage.getItem("userData")) || null;
  const ts = user?.createdAt;

  if (!ts) return "";

  if (ts._seconds) {
    return new Date(ts._seconds * 1000).toLocaleDateString();
  }

  return ts;
};
